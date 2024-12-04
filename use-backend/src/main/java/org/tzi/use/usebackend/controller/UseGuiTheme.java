package org.tzi.use.usebackend.controller;

import javax.swing.*;
import javax.swing.plaf.FontUIResource;
import javax.swing.plaf.metal.DefaultMetalTheme;
import java.awt.*;

class UseGuiTheme extends DefaultMetalTheme {
    private FontUIResource controlFont;

    private FontUIResource systemFont;

    private FontUIResource userFont;

    private FontUIResource smallFont;

    UseGuiTheme() {
        // System.out.println("font: " + Font.getFont("use.gui.controlFont"));
        controlFont = new FontUIResource(Font.getFont("use.gui.controlFont",
                super.getControlTextFont()));
        systemFont = new FontUIResource(Font.getFont("use.gui.systemFont",
                super.getSystemTextFont()));
        userFont = new FontUIResource(Font.getFont("use.gui.userFont", super
                .getUserTextFont()));
        smallFont = new FontUIResource(Font.getFont("use.gui.smallFont", super
                .getSubTextFont()));
    }

    public String getName() {
        return "USE";
    }

    public FontUIResource getControlTextFont() {
        return controlFont;
    }

    public FontUIResource getSystemTextFont() {
        return systemFont;
    }

    public FontUIResource getUserTextFont() {
        return userFont;
    }

    public FontUIResource getMenuTextFont() {
        return controlFont;
    }

    public FontUIResource getWindowTitleFont() {
        return controlFont;
    }

    public FontUIResource getSubTextFont() {
        return smallFont;
    }

    public void addCustomEntriesToTable(UIDefaults table) {
        initIcon(table, "Tree.expandedIcon", "TreeExpanded.gif");
        initIcon(table, "Tree.collapsedIcon", "TreeCollapsed.gif");
        initIcon(table, "Tree.leafIcon", "TreeLeaf.gif");
        initIcon(table, "Tree.openIcon", "TreeOpen.gif");
        initIcon(table, "Tree.closedIcon", "TreeClosed.gif");
        table.put("Desktop.background", table.get("Menu.background"));
    }

    private void initIcon(UIDefaults table, String property, String iconFilename) {
        table.put(property, new ImageIcon(getClass().getResource("/images/" + iconFilename)));
    }

}
