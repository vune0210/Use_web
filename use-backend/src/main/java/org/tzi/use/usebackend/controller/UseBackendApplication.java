package org.tzi.use.usebackend.controller;

import com.fasterxml.jackson.databind.JsonNode;
import org.jruby.exceptions.Exception;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.multipart.MultipartFile;
import org.tzi.use.config.Options;
import org.tzi.use.gui.main.MainWindow;
import org.tzi.use.main.Session;
import org.tzi.use.main.shell.Shell;
import org.tzi.use.parser.use.USECompiler;
import org.tzi.use.runtime.IPluginRuntime;
import org.tzi.use.uml.mm.MMPrintVisitor;
import org.tzi.use.uml.mm.MMVisitor;
import org.tzi.use.uml.mm.MModel;
import org.tzi.use.uml.mm.ModelFactory;
import org.tzi.use.uml.ocl.extension.ExtensionManager;
import org.tzi.use.uml.sys.MSystem;
import org.tzi.use.uml.sys.MSystemException;
import org.tzi.use.uml.sys.MSystemState;
import org.tzi.use.usebackend.api_resp.ApiResponse;
import org.tzi.use.usebackend.api_resp.dia.ClassDiagramResp;
import org.tzi.use.usebackend.api_resp.dia.ObjectDiagramResp;
import org.tzi.use.usebackend.api_resp.state.crte_obj.CreateObjBody;
import org.tzi.use.usebackend.api_resp.state.crte_obj.CreateObjResp;
import org.tzi.use.usebackend.api_resp.state.obj_prop.ObjectPropertyBody;
import org.tzi.use.usebackend.api_resp.state.obj_prop.ObjectPropertyResp;
import org.tzi.use.usebackend.api_resp.state.ocl_eval.OclEvalBody;
import org.tzi.use.usebackend.api_resp.utility_view.CommandListResp;
import org.tzi.use.usebackend.api_resp.utility_view.CountResp;
import org.tzi.use.usebackend.api_resp.utility_view.StateEvolutionResp;
import org.tzi.use.usebackend.api_resp.utility_view.mdl_brw.ModalBrowserInfoResp;
import org.tzi.use.usebackend.api_resp.utility_view.mdl_brw.ModalBrowserResp;
import org.tzi.use.usebackend.controller.dia.ClassDiagramBE;
import org.tzi.use.usebackend.controller.dia.ObjectDiagramBE;
import org.tzi.use.usebackend.controller.dia.SequenceDiagramBE;
import org.tzi.use.usebackend.controller.plugin.IPluginApiExtensionPoint;
import org.tzi.use.usebackend.controller.plugin.PluginApi;
import org.tzi.use.usebackend.controller.state.*;
import org.tzi.use.usebackend.controller.utils.CallStackBE;
import org.tzi.use.usebackend.controller.utils.CountChartBE;
import org.tzi.use.usebackend.controller.utils.ModalBrowserBE;
import org.tzi.use.usebackend.controller.utils.UtilityViewBE;
import org.tzi.use.util.Log;
import org.tzi.use.util.USEWriter;

import javax.swing.plaf.metal.MetalLookAndFeel;
import java.io.*;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

@SpringBootApplication
@RestController
public class UseBackendApplication {

    public static Session session;
    public static IPluginRuntime pluginRuntime;

    public static MainWindow window;
    static Map<String, PluginApi> pluginApis;

    public static void main(String[] args) {
//		SpringApplication.run(UseBackendApplication.class, args);
        SpringApplicationBuilder builder = new SpringApplicationBuilder(UseBackendApplication.class);
        builder.headless(false);
        ConfigurableApplicationContext context = builder.run(args);

        // set System.out to the OldUSEWriter to protocol the output.
        System.setOut(USEWriter.getInstance().getOut());
        // set System.err to the OldUSEWriter to protocol the output.
        System.setErr(USEWriter.getInstance().getErr());

        // read and set global options, setup application properties
        Options.processArgs(args);
        if (Options.doGUI) {
            initGUIdefaults();
        }

        session = new Session();
        pluginRuntime = null;
        MModel model = null;
        MSystem system = null;

        if (!Options.disableExtensions) {
            ExtensionManager.EXTENSIONS_FOLDER = Options.homeDir + "/oclextensions";
            ExtensionManager.getInstance().loadExtensions();
        }

        // Plugin Framework
        if (Options.doPLUGIN) {
            // create URL from plugin directory
            Path pluginDirURL = Options.pluginDir;
            Log.verbose("Plugin path: [" + pluginDirURL + "]");
            Class<?> mainPluginRuntimeClass = null;
            try {
                mainPluginRuntimeClass = Class
                        .forName("org.tzi.use.usebackend.controller.plugin.MainPluginRuntimeBE");
            } catch (ClassNotFoundException e) {
                Log
                        .error("Could not load PluginRuntime. Probably use-runtime-...jar is missing.\n"
                                + "Try starting use with -noplugins switch.\n"
                                + e.getMessage());
                System.exit(1);
            }
            try {
                Method run = mainPluginRuntimeClass.getMethod("run",
                        new Class[]{Path.class});
                pluginRuntime = (IPluginRuntime) run.invoke(null,
                        new Object[]{pluginDirURL});
                Log.debug("Starting plugin runtime, got class ["
                        + pluginRuntime.getClass() + "]");
            } catch (Exception | NoSuchMethodException e) {
                e.printStackTrace();
                Log.error("FATAL ERROR.");
                System.exit(1);
            } catch (InvocationTargetException e) {
                throw new RuntimeException(e);
            } catch (IllegalAccessException e) {
                throw new RuntimeException(e);
            }
        }

        // compile spec if filename given as argument
        if (Options.specFilename != null) {
            try (FileInputStream specStream = new FileInputStream(Options.specFilename)) {
                Log.verbose("compiling specification...");
                model = USECompiler.compileSpecification(specStream,
                        Options.specFilename, new PrintWriter(System.err),
                        new ModelFactory());
            } catch (FileNotFoundException e) {
                Log.error("File `" + Options.specFilename + "' not found.");
                System.exit(1);
            } catch (IOException e1) {
                // close failed
            }

            // compile errors?
            if (model == null) {
                System.exit(1);
            }

            if (!Options.quiet) {
                Options.setLastDirectory(new java.io.File(Options.specFilename).getAbsoluteFile().toPath().getParent());
            }
            if (!Options.testMode)
                Options.getRecentFiles().push(Options.specFilename);

            if (Options.compileOnly) {
                Log.verbose("no errors.");
                if (Options.compileAndPrint) {
                    MMVisitor v = new MMPrintVisitor(new PrintWriter(
                            System.out, true));
                    model.processWithVisitor(v);
                }
                System.exit(0);
            }

            // print some info about model
            Log.verbose(model.getStats());

            // create system
            system = new MSystem(model);
        }
        session.setSystem(system);

        // api
        if (Options.doPLUGIN) {
            IPluginApiExtensionPoint apiExtensionPoint = (IPluginApiExtensionPoint) pluginRuntime
                    .getExtensionPoint("api");
            pluginApis = apiExtensionPoint.createPluginApi(session);
        }

        if (Options.doGUI) {
            if (pluginRuntime == null) {
                Log.debug("Starting gui without plugin runtime!");
                window = MainWindow.create(session);
//				window = BEMainWindow.create(session);
            } else {
                Log.debug("Starting gui with plugin runtime.");
                window = MainWindow.create(session, pluginRuntime);
//				window = BEMainWindow.create(session, pluginRuntime);
            }
        }

        // create thread for shell
        Shell.createInstance(session, pluginRuntime);
        Shell sh = Shell.getInstance();
        Thread t = new Thread(sh);
        t.start();

        // wait on exit from shell (this thread never returns)
        try {
            t.join();
        } catch (InterruptedException ex) {
            // ignored
        }

    }

    private static void initGUIdefaults() {
        MetalLookAndFeel.setCurrentTheme(new UseGuiTheme());
    }

    @PostMapping("/open")
    @CrossOrigin
    public ApiResponse openSpecification(@RequestParam("file") MultipartFile file) {
        try {
            UseCompiler.compileUseFile(session, file);
            return new ApiResponse(true, null);
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse(false, e.getMessage());
        }
    }

    @PostMapping("/undo")
    @CrossOrigin
    public ApiResponse undo() {
        try {
            UndoRedoBE undoRedoBE = new UndoRedoBE(session);
            return undoRedoBE.undo();
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse(false, e.getMessage());
        }
    }

    @PostMapping("/redo")
    @CrossOrigin
    public ApiResponse redo() {
        try {
            UndoRedoBE undoRedoBE = new UndoRedoBE(session);
            return undoRedoBE.redo();
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse(false, e.getMessage());
        }
    }
    @GetMapping("/undo-redo/avail")
    @CrossOrigin
    public ApiResponse getUndoRedoAvailability() {
        try {
            UndoRedoBE undoRedoBE = new UndoRedoBE(session);
            return undoRedoBE.getUndoRedoAvailability();
        } catch (Exception e) {
            e.printStackTrace();
            return new ApiResponse(false, e.getMessage());
        }
    }


    @GetMapping("/modal-browser")
    @CrossOrigin
    public ModalBrowserResp modalBrowser() {
        try {
            ModalBrowserBE modalBrowserBE = new ModalBrowserBE(session.system(), pluginRuntime);
            return new ModalBrowserResp(modalBrowserBE.response());
        } catch (IllegalStateException e) {
            return new ModalBrowserResp(false, "No system");
        }
    }

    @GetMapping("/modal-browser/info")
    @CrossOrigin
    public ApiResponse modalBrowserInfo(@RequestParam(value = "type") String type, @RequestParam(value = "name") String name) {
        try {
            ModalBrowserBE modalBrowserBE = new ModalBrowserBE(session.system(), pluginRuntime);
            return new ModalBrowserInfoResp(modalBrowserBE.displayNode(type, name));
        } catch (IllegalStateException e) {
            return new ApiResponse(false, "No system");
        }
    }

    @GetMapping("/view/class-diagram")
    @CrossOrigin
    public ClassDiagramResp classDiagram() {
        try {
            ClassDiagramBE classDia = new ClassDiagramBE(session.system());
            return classDia.response();
        } catch (IllegalStateException e) {
            return new ClassDiagramResp(false, "No system");
        }
    }

    @GetMapping("/view/object-diagram")
    @CrossOrigin
    public ObjectDiagramResp objectDiagram() {
        try {
            ObjectDiagramBE objDia = new ObjectDiagramBE(session.system());
            return objDia.response();
        } catch (IllegalStateException e) {
            return new ObjectDiagramResp(false, "No system");
        }
    }

    @GetMapping("/view/seq-diagram")
    @CrossOrigin
    public ApiResponse seqDiagram() {
        try {
            SequenceDiagramBE seqDia = new SequenceDiagramBE(session.system());
            return seqDia.getEvents();
        } catch (IllegalStateException e) {
            return new ApiResponse(false, "No system");
        }
    }

    @GetMapping("/view/object-count")
    @CrossOrigin
    public CountResp objectCount() {
        try {
            CountChartBE countChart = new CountChartBE(session.system());
            return countChart.objectCount();
        } catch (IllegalStateException e) {
            return new CountResp(false, "No system");
        }
    }

    @GetMapping("/view/link-count")
    @CrossOrigin
    public CountResp linkCount() {
        try {
            CountChartBE countChart = new CountChartBE(session.system());
            return countChart.linkCount();
        } catch (IllegalStateException e) {
            return new CountResp(false, "No system");
        }
    }

    @GetMapping("/view/command-list")
    @CrossOrigin
    public CommandListResp commandList() {
        try {
            UtilityViewBE utilityViewBE = new UtilityViewBE(session.system());
            return utilityViewBE.getCommandList();
        } catch (IllegalStateException e) {
            return new CommandListResp(false, "No system");
        }
    }

    @GetMapping("/state/create-object")
    @CrossOrigin
    public CreateObjResp createObjectGetClassList() {
        try {
            CreateObjectBE createObjectBE = new CreateObjectBE(session.system());
            return createObjectBE.getClassList();
        } catch (IllegalStateException e) {
            return new CreateObjResp(false, "No system");
        }
    }

    @PostMapping("/state/create-object")
    @CrossOrigin
    public CreateObjResp createObject(@RequestBody(required = true) CreateObjBody body) {
        try {
            CreateObjectBE createObjectBE = new CreateObjectBE(session.system());
            createObjectBE.createObject(body.getClassName(), body.getObjectName());
            return new CreateObjResp(true, "Created");
        } catch (MSystemException | IllegalStateException e) {
            return new CreateObjResp(false, e.getMessage());
        }
    }

    @GetMapping("/state/object-property")
    @CrossOrigin
    public ObjectPropertyResp getObjectState(@RequestParam(value = "objName") String objName) {
        try {
            ObjectPropertyBE objectBE = new ObjectPropertyBE(session.system());
            return objectBE.getObjectState(objName);
        } catch (IllegalStateException e) {
            return new ObjectPropertyResp(false, "No system");
        }
    }

    @PostMapping("/state/object-property")
    @CrossOrigin
    public ObjectPropertyResp updateObject(@RequestParam(value = "objName") String objName, @RequestBody(required = true) ObjectPropertyBody body) {
        try {
            ObjectPropertyBE objectBE = new ObjectPropertyBE(session.system());
            return objectBE.updateObject(objName, body.getValues());
        } catch (IllegalStateException e) {
            return new ObjectPropertyResp(false, "No system");
        }
    }

    @PostMapping("/state/reset")
    @CrossOrigin
    public ApiResponse resetState() {
        try {
            session.reset();
            return new ApiResponse(true, "Session reset");
        } catch (IllegalStateException e) {
            return new ApiResponse(false, "No system");
        }
    }

    @PostMapping("/state/ocl-eval")
    @CrossOrigin
    public ApiResponse evalOCLExpr(@RequestBody(required = true) OclEvalBody inp) {
        try {
            EvaluateOCLExpr evaluateOCLExpr = new EvaluateOCLExpr(session.system());
            return evaluateOCLExpr.evaluate(inp.getExpr(), true);
        } catch (IllegalStateException e) {
            return new ApiResponse(false, "No system");
        }
    }

    @GetMapping("/state/check-structure")
    @CrossOrigin
    public ApiResponse checkStructure() {
        try {
            StringWriter msgWriter = new StringWriter();
            PrintWriter out = new PrintWriter(msgWriter, true);
            boolean ok = session.system().state().checkStructure(out);
            return new ApiResponse(true, msgWriter.toString() + "\nchecking structure, "
                    + ((ok) ? "ok." : "found errors."));
        } catch (IllegalStateException e) {
            return new ApiResponse(false, "No system");
        }
    }

    @GetMapping("/state/determine-state")
    @CrossOrigin
    public ApiResponse determineState() {
        try {
            StringWriter msgWriter = new StringWriter();
            PrintWriter out = new PrintWriter(msgWriter, true);
            session.system().determineStates(out);
            return new ApiResponse(true, msgWriter.toString());
        } catch (IllegalStateException e) {
            return new ApiResponse(false, "No system");
        }
    }

    @GetMapping("/state/check-state-invariants")
    @CrossOrigin
    public ApiResponse checkStateInvariants() {
        try {
            StringWriter msgWriter = new StringWriter();
            PrintWriter out = new PrintWriter(msgWriter, true);
            session.system().state().checkStateInvariants(out);
            return new ApiResponse(true, msgWriter.toString());
        } catch (IllegalStateException e) {
            return new ApiResponse(false, "No system");
        }
    }

    @GetMapping("/view/state-evo")
    @CrossOrigin
    public ApiResponse stateEvolution() {
        try {
            MSystemState systemState = session.system().state();
            return new StateEvolutionResp(systemState.allObjects().size(), systemState.allLinks().size());
        } catch (IllegalStateException e) {
            return new ApiResponse(false, "No system");
        }
    }

    @GetMapping("/view/invariant")
    @CrossOrigin
    public ApiResponse classInvariant() {
        try {
            ClassInvariantsBE classInvariantsBE = new ClassInvariantsBE(session.system());
            return classInvariantsBE.run();
        } catch (IllegalStateException e) {
            return new ApiResponse(false, "No system");
        } catch (ExecutionException e) {
            return new ApiResponse(false, "ExecutionException");
        } catch (InterruptedException e) {
            return new ApiResponse(false, "InterruptedException");
        }
    }

    @GetMapping("/view/callstack")
    @CrossOrigin
    public ApiResponse callStack() {
        try {
            CallStackBE callStackBE = new CallStackBE(session.system());
            return callStackBE.getCallStack();
        } catch (IllegalStateException e) {
            return new ApiResponse(false, "No system");
        }
    }

    @GetMapping("/view/class-extent")
    @CrossOrigin
    public ApiResponse classExtent(@RequestParam(value = "className") String className) {
        try {
            ClassExtentBE callStackBE = new ClassExtentBE(session.system(), className, true);
            return callStackBE.get();
        } catch (IllegalStateException e) {
            return new ApiResponse(false, "No system");
        }
    }

    @GetMapping(value = {"/plugins/{path}", "/plugins/{path}/{subPath}"})
    @CrossOrigin
    public ApiResponse pluginApiPerformGet(@PathVariable String path, @PathVariable(required = false) String subPath) {
        try{
            return pluginApis.get(path).performGetMethod(subPath, "");
        } catch (IllegalStateException e) {
            return new ApiResponse(false, "No system");
        } catch (Exception e) {
            System.out.println(e);
            return new ApiResponse(false, "Plugin error");
        }
    }

    @PostMapping(value = {"/plugins/{path}", "/plugins/{path}/{subPath}"})
    @CrossOrigin
    public ApiResponse pluginApiPerformPost(@PathVariable String path, @PathVariable(required = false) String subPath, @RequestPart(value = "body", required = false) JsonNode partBody, @RequestPart(value = "files", required = false) MultipartFile[] files) {
        try{
            return pluginApis.get(path).performPostMethod(subPath, partBody, files);
        } catch (IllegalStateException e) {
            return new ApiResponse(false, "No system");
        } catch (Exception e) {
            System.out.println(e);
            return new ApiResponse(false, "Plugin error");
        }
    }

    @GetMapping("/plugins-fe/list")
    @CrossOrigin
    public @ResponseBody ApiResponse webPluginList() {
        return new PluginListApiResp(pluginRuntime.getPlugins().keySet());
    }

    @GetMapping(value = {"/plugins-fe/{name}/{path}", "/plugins-fe/{name}/{path}/{subPath}"})
    @CrossOrigin
    public @ResponseBody ResponseEntity<InputStreamResource> webPluginHTML(@PathVariable String name, @PathVariable String path, @PathVariable(required = false) String subPath) throws IOException, NoSuchFieldException {
        File pluginFile = new File(pluginRuntime.getPlugins().get(name).getPluginLocation().getPath());
        JarFile jarFile = new JarFile(pluginFile);
        Enumeration<? extends JarEntry> e = jarFile.entries();
        String entryPath = "resources/html/"+path + (subPath != null ? "/" + subPath : "");
        InputStream inputStream = jarFile.getInputStream(jarFile.getEntry(entryPath));
        return ResponseEntity.ok()
                .contentType(ContentType.getContentType(entryPath))
                .body(new InputStreamResource(inputStream));
    }

//    @GetMapping("/plugins")
//    @CrossOrigin
//    public ArrayList<PluginInfo> getPluginCommandList() {
//        try{
//            PluginsManagerBE pluginBE = new PluginsManagerBE(pluginRuntime, session, Shell.getInstance(), window.getBEWriter());
//            return pluginBE.getPluginList();
//        } catch (IllegalStateException e) {
//            return new ArrayList<>();
//        }
//    }

//	@PostMapping("/plugins/{command}")
//	@CrossOrigin
//	public ApiResponse runPluginCommand(@PathVariable("command") String command, @RequestParam("args") String args) {
//		try{
//            PluginsManagerBE pluginBE = new PluginsManagerBE(pluginRuntime, session, Shell.getInstance(), window.getBEWriter());
//			return new ApiResponse(true, pluginBE.executePluginCmd(command, args));
//		} catch (IllegalStateException e) {
//			return new ApiResponse(false, e.getMessage());
//		}
//	}

    @Bean
    public CorsFilter corsFilter() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(Arrays.asList("*://localhost:*", "vscode-webview://*", "*://192.168.*.*:*")); // Provide list of origins if you want multiple origins
        config.setAllowedHeaders(Arrays.asList("Origin", "Content-Type", "Accept"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "OPTIONS", "DELETE", "PATCH"));
        config.setAllowCredentials(true);
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

//    @Configuration
//    @EnableWebMvc
//    public class MvcConfig implements WebMvcConfigurer {
//        @Override
//        public void addResourceHandlers(ResourceHandlerRegistry registry) {
//            File pluginFile = new File("/C:/PERFORMANCE_DEV/@lv/new2-use/use-web/use-core/target/lib/plugins/use-plugins-validator.jar");
//
//            try {
//                JarFile jarFile = new JarFile(pluginFile);
//                Enumeration<JarEntry> entries = jarFile.entries();
//                while (entries.hasMoreElements()) {
//                    JarEntry entry = entries.nextElement();
//                    System.out.println(entry.getName());
//                }
//                InputStream inputStream = jarFile.getInputStream(jarFile.getEntry("resources/html/index.html"));
//
////                InputSource inputSource = new InputSource(inputStream);
//                String path = "file:///C:/PERFORMANCE_DEV/@lv/new2-use/use-web/use-vite-frontend/use-vite-plugin-validator/dist/index.html";
//                registry
//                        .addResourceHandler("/my-web-plugins/index.html")
//                        .addResourceLocations(path);
//            } catch (IOException ioe) {
//                Log.error("No such plugin config file: 	", ioe);
//            }
//
//        }
//
//        @Override
//        public void addViewControllers(ViewControllerRegistry registry) {
//            registry.addViewController("/").setViewName("/index.html");
//        }
//    }
}

