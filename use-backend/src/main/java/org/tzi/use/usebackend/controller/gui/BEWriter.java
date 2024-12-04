package org.tzi.use.usebackend.controller.gui;

import org.tzi.use.gui.util.TextComponentWriter;

import javax.swing.text.JTextComponent;
import java.io.IOException;

public class BEWriter extends TextComponentWriter {
    private String buffer;

    public BEWriter(JTextComponent textComp) {
        super(textComp);
        this.buffer = "";
    }

    @Override
    public void write(char[] cbuf, int off, int len) throws IOException {
        super.write(cbuf, off, len);
        final String s = new String(cbuf, off, len);
        this.buffer += s;
    }

    public String flushBuffer() {
        String buff = this.buffer;
        this.buffer = "";
        return buff;
    }
}
