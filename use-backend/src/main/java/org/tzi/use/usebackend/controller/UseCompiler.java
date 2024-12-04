package org.tzi.use.usebackend.controller;

import org.springframework.web.multipart.MultipartFile;
import org.tzi.use.main.Session;
import org.tzi.use.parser.use.USECompiler;
import org.tzi.use.uml.mm.MModel;
import org.tzi.use.uml.mm.ModelFactory;
import org.tzi.use.uml.sys.MSystem;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;

public class UseCompiler {
    private final Session fSession;

    public UseCompiler(Session fSession) {
        this.fSession = fSession;
    }

    public static boolean compileUseFile(Session fSession, MultipartFile file) {
        return new UseCompiler(fSession).compile(file);
    }

    protected boolean compile(final MultipartFile file) {
        PrintWriter fLogWriter = new PrintWriter(System.err);
        fLogWriter.println("compiling specification " + file.getOriginalFilename() + "..." + file.getName());

        MModel model = null;
        try (InputStream iStream = file.getInputStream()) {
            model = USECompiler.compileSpecification(iStream, file.getName(),
                    fLogWriter, new ModelFactory());
            fLogWriter.println("done.");
        } catch (IOException ex) {
            fLogWriter.println("Can't read `" + file.getOriginalFilename() + "' content");
        }

        final MSystem system;
        if (model != null) {
            fLogWriter.println(model.getStats());
            // create system
            system = new MSystem(model);
        } else {
            system = null;
        }

        fSession.setSystem(system);

        if (system != null) {
//            Options.getRecentFiles().push(f.toString());
//            Options.setLastDirectory(f.getParent());
            return true;
        } else {
            return false;
        }
    }
}
