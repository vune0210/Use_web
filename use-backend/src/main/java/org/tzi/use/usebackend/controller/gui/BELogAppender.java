package org.tzi.use.usebackend.controller.gui;

import org.apache.log4j.WriterAppender;
import org.apache.log4j.spi.LoggingEvent;

import java.io.PrintWriter;

public class BELogAppender extends WriterAppender {
    private static PrintWriter printWriter;

    public static void initialize(final PrintWriter printWriter) {
        BELogAppender.printWriter = printWriter;
    }

    @Override
    public void append(final LoggingEvent loggingEvent) {
        if (BELogAppender.printWriter != null) {
            BELogAppender.printWriter.print(this.layout.format(loggingEvent));
        }
    }
}
