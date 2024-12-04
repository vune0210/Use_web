//package org.tzi.use.usebackend.controller.gui;
//
//import org.tzi.use.gui.main.MainWindow;
//import org.tzi.use.main.Session;
//import org.tzi.use.main.runtime.IRuntime;
//
//import java.io.PrintWriter;
//import org.apache.log4j.Logger;
//
//public class BEMainWindow extends MainWindow {
//    // TODO: MainWindow constructor have changed to protected (making extends possible)
//    BEWriter fBeWriter;
//    protected BEMainWindow(Session session, IRuntime pluginRuntime) {
//        super(session, pluginRuntime);
//        // TODO: fLogWriter, fLogPanel have changed to protected (making it accessible)
//        // TODO: class LogPanel have changed to public (making it accessible)
//        // TODO: fLogWriter have removed final
//        fBeWriter = new BEWriter(fLogPanel.getTextComponent());
//        fLogWriter = new PrintWriter(fBeWriter, true);
//
//        BELogAppender.initialize(fLogWriter);
//        Logger.getRootLogger().addAppender(new BELogAppender());
//    }
//
//    /**
//     * Creates some initial views and tiles them.
//     */
//    public static BEMainWindow create(Session session) {
//
//        return create(session, null);
//    }
//
//    public static BEMainWindow create(Session session, IRuntime pluginRuntime) {
//        final BEMainWindow win = new BEMainWindow(session, pluginRuntime);
//
//        win.pack();
//        win.setLocationRelativeTo(null);
//        win.setVisible(true);
//        return win;
//    }
//
//    public BEWriter getBEWriter() {
//        return fBeWriter;
//    }
//}
