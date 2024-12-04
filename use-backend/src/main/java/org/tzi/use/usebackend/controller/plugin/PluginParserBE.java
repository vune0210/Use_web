package org.tzi.use.usebackend.controller.plugin;

import org.tzi.use.runtime.model.PluginActionModel;
import org.tzi.use.runtime.model.PluginServiceModel;
import org.tzi.use.runtime.model.PluginShellCmdModel;
import org.tzi.use.runtime.util.IPluginParserSymbols;
import org.tzi.use.util.Log;
import org.xml.sax.Attributes;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;
import org.xml.sax.helpers.DefaultHandler;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import java.io.IOException;
import java.util.Stack;
import java.util.Vector;

/**
 * Copy from PluginParser.java
 * add APIs parsers
 */
public class PluginParserBE extends DefaultHandler implements IPluginParserSymbols, IPluginParserSymbolsBE {
    protected final Stack<PluginModelBE> pluginDesciptors = new Stack<PluginModelBE>();

    private final SAXParserFactory factory = SAXParserFactory.newInstance();

    public void characters(char buf[], int offset, int len) throws SAXException {
        Log.debug("PluginParser: Touching characters.");
        String s = new String(buf, offset, len);
        Log.debug(s);
    }

    public void endDocument() {
        Log.debug("PluginParser: Touching endDocument.");
    }

    public void endElement(String uri, String elementName, String qName) {
        Log.debug("PluginParser: Touching endElement.");
    }

    public void handlePlugin(String qName, Attributes attributes) {
        Log.debug("PluginParser: Entering handlePlugin.");
        Log.debug("PluginParser: element=[" + qName + "]");
        if (qName.equals(PLUGIN)) {
            Log.debug("PluginParser:  attributes counted ["
                    + attributes.getLength() + "]");
            parsePluginAttributes(attributes);
        } else {
            Log.debug("PluginParser: handlePlugin  at " + qName);
        }
        Log.debug("PluginParser: Leaving handlePlugin.");
    }

    public void handlePluginAction(String qName, Attributes attributes) {
        Log.debug("PluginParser: Entering handlePluginAction.");
        Log.debug("PluginParser: element=[" + qName + "]");
        if (qName.equals(PLUGIN_ACTION)) {
            Log.debug("PluginParser:  attributes counted ["
                    + attributes.getLength() + "]");
            parsePluginActionAttributes(attributes);
        } else {
            Log.debug("PluginParser: handlePluginAction  at " + qName);
        }
        Log.debug("PluginParser: Leaving handlePluginAction.");
    }

    public void handlePluginCommands(String qName, Attributes attributes) {
        Log.debug("PluginParser: Entering handlePluginCommands.");
        Log.debug("PluginParser: element=[" + qName + "]");
        if (qName.equals(PLUGIN_COMMAND)) {
            Log.debug("PluginParser:  attributes counted ["
                    + attributes.getLength() + "]");
            parsePluginCmdAttributes(attributes);
        } else {
            Log.debug("PluginParser: handlePluginCommand  at " + qName);
        }
        Log.debug("PluginParser: Leaving handlePluginCommand.");
    }

    public void handlePluginService(String qName, Attributes attributes) {
        Log.debug("PluginParser: Entering handlePluginService.");
        Log.debug("PluginParser: element=[" + qName + "]");
        if (qName.equals(PLUGIN_SERVICE)) {
            Log.debug("PluginParser:  attributes counted ["
                    + attributes.getLength() + "]");
            parsePluginServiceAttributes(attributes);
        } else {
            Log.debug("PluginParser: handlePluginService  at " + qName);
        }
        Log.debug("PluginParser: Leaving handlePluginService.");
    }

    protected void internalError(String position, String attribute) {
        System.out.println("Parse error at position " + position
                + " with Attribute " + attribute);
    }

    public synchronized PluginModelBE parsePlugin(InputSource inputSource)
            throws SAXException, IOException, ParserConfigurationException {

        SAXParser saxParser = factory.newSAXParser();
        saxParser.parse(inputSource, this);
        return pluginDesciptors.pop();
    }

    public void parsePluginActionAttributes(Attributes attributes) {

        PluginActionModel action = new PluginActionModel();

        PluginModelBE current = this.pluginDesciptors.pop();
        Vector<PluginActionModel> actions = current.getActions();

        Log.debug("PluginParser: Entering parsePluginActionAttributes.");
        // process attributes
        int len = attributes.getLength();
        Log
                .debug("PluginParser: parsePluginActionAttributes counted attributes ["
                        + attributes.getLength() + "]");
        for (int i = 0; i < len; i++) {
            String attrName = attributes.getQName(i);
            String attrValue = attributes.getValue(attrName);
            Log.debug("PluginParser: " + attrName + " found.");
            if (attrName.equals(PLUGIN_ID)) {
                action.setId(attrValue);
                Log.debug("Setting " + attrName);
            } else if (attrName.equals(PLUGIN_ACTION_ICON)) {
                action.setIcon(attrValue);
                Log.debug("Setting " + attrName);
            } else if (attrName.equals(PLUGIN_ACTION_CLASS)) {
                action.setActionClass(attrValue);
                Log.debug("Setting " + attrName);
            } else if (attrName.equals(PLUGIN_ACTION_LABEL)) {
                action.setLabel(attrValue);
                Log.debug("Setting " + attrName);
            } else if (attrName.equals(PLUGIN_ACTION_TOOLTIP)) {
                action.setTooltip(attrValue);
                Log.debug("Setting " + attrName);
            } else if (attrName.equals(PLUGIN_ACTION_MENU)) {
                action.setMenu(attrValue);
                Log.debug("Setting " + attrName);
            } else if (attrName.equals(PLUGIN_ACTION_MENU_ITEM)) {
                action.setMenuitem(attrValue);
                Log.debug("Setting " + attrName);
            } else if (attrName.equals(PLUGIN_ACTION_TOOLBAR_ITEM)) {
                action.setToolbaritem(attrValue);
                Log.debug("Setting " + attrName);
            } else
                internalError(PLUGIN, attrName);
        }
        actions.add(action);
        pluginDesciptors.push(current);
        Log.debug("PluginParser: Leaving parsePlugin.");
    }

    public void parsePluginAttributes(Attributes attributes) {

        PluginModelBE current = new PluginModelBE();

        this.pluginDesciptors.push(current);
        Log.debug("PluginParser: Entering parsePlugin.");
        // process attributes
        int len = attributes.getLength();
        Log.debug("PluginParser: parsePlugin counted attributes ["
                + attributes.getLength() + "]");
        for (int i = 0; i < len; i++) {
            String attrName = attributes.getQName(i);
            String attrValue = attributes.getValue(attrName);
            Log.debug("PluginParser: " + attrName + " found.");
            if (attrName.equals(PLUGIN_ID)) {
                current.setId(attrValue);
                Log.debug("Setting " + attrName);
            } else if (attrName.equals(PLUGIN_NAME)) {
                current.setName(attrValue);
                Log.debug("Setting " + attrName);
            } else if (attrName.equals(PLUGIN_VERSION)) {
                current.setVersion(attrValue);
                Log.debug("Setting " + attrName);
            } else if (attrName.equals(PLUGIN_PUBLISHER)) {
                current.setPublisher(attrValue);
                Log.debug("Setting " + attrName);
            } else if (attrName.equals(PLUGIN_CLASS)) {
                current.setPluginClass(attrValue);
                Log.debug("Setting " + attrName);
            } else
                internalError(PLUGIN, attrName);
        }
        Log.debug("PluginParser: Leaving parsePlugin.");
    }

    public void parsePluginCmdAttributes(Attributes attributes) {

        PluginShellCmdModel command = new PluginShellCmdModel();

        PluginModelBE current = this.pluginDesciptors.pop();
        Vector<PluginShellCmdModel> commands = current.getCommands();

        Log.debug("PluginParser: Entering parsePluginCmd.");
        // process attributes
        int len = attributes.getLength();
        Log.debug("PluginParser: parsePluginCmd counted attributes ["
                + attributes.getLength() + "]");
        for (int i = 0; i < len; i++) {
            String attrName = attributes.getQName(i);
            String attrValue = attributes.getValue(attrName);
            Log.debug("PluginParser: " + attrName + " found.");
            if (attrName.equals(PLUGIN_COMMAND_ID)) {
                command.setId(attrValue);
                Log.debug("Setting " + attrName);
            } else if (attrName.equals(PLUGIN_COMMAND_LABEL)) {
                command.setLabel(attrValue);
                Log.debug("Setting " + attrName);
            } else if (attrName.equals(PLUGIN_COMMAND_CLASS)) {
                command.setCmdClass(attrValue);
                Log.debug("Setting " + attrName);
            } else if (attrName.equals(PLUGIN_COMMAND_SHELLCMD)) {
                command.setShellCmd(attrValue);
                Log.debug("Setting " + attrName);
            } else if (attrName.equals(PLUGIN_COMMAND_ALIAS)) {
                command.setAlias(attrValue);
                Log.debug("Setting " + attrName);
            } else if (attrName.equals(PLUGIN_COMMAND_HELP)) {
                command.setCmdHelp(attrValue);
                Log.debug("Setting " + attrName);
            } else
                internalError(PLUGIN, attrName);
        }
        commands.add(command);
        this.pluginDesciptors.push(current);
        Log.debug("PluginParser: Leaving parsePluginCmd.");
    }

    public void parsePluginServiceAttributes(Attributes attributes) {

        PluginServiceModel service = new PluginServiceModel();

        PluginModelBE current = this.pluginDesciptors.pop();
        Vector<PluginServiceModel> services = current.getServices();

        Log.debug("PluginParser: Entering parsePluginService.");
        // process attributes
        int len = attributes.getLength();
        Log.debug("PluginParser: parsePluginService counted attributes ["
                + attributes.getLength() + "]");
        for (int i = 0; i < len; i++) {
            String attrName = attributes.getQName(i);
            String attrValue = attributes.getValue(attrName);
            Log.debug("PluginParser: " + attrName + " found.");
            if (attrName.equals(PLUGIN_SERVICE_ID)) {
                service.setId(attrValue);
                Log.debug("Setting " + attrName);
            } else if (attrName.equals(PLUGIN_SERVICE_LABEL)) {
                service.setName(attrValue);
                Log.debug("Setting " + attrName);
            } else if (attrName.equals(PLUGIN_SERVICE_CLASS)) {
                service.setServiceClass(attrValue);
                Log.debug("Setting " + attrName);
            } else
                internalError(PLUGIN, attrName);
        }
        services.add(service);
        this.pluginDesciptors.push(current);
        Log.debug("PluginParser: Leaving parsePluginService.");
    }

    public void handlePluginApis(String qName, Attributes attributes) {
        Log.debug("PluginParser: Entering handlePluginApis.");
        Log.debug("PluginParser: element=[" + qName + "]");
        if (qName.equals(PLUGIN_API)) {
            Log.debug("PluginParser:  attributes counted ["
                    + attributes.getLength() + "]");
            parsePluginApiAttributes(attributes);
        } else {
            Log.debug("PluginParser: handlePluginApi  at " + qName);
        }
        Log.debug("PluginParser: Leaving handlePluginApi.");
    }

    public void parsePluginApiAttributes(Attributes attributes) {

        PluginApiModel api = new PluginApiModel();

        PluginModelBE current = this.pluginDesciptors.pop();
        Vector<PluginApiModel> apis = current.getApis();

        Log.debug("PluginParser: Entering handlePluginApi.");
        // process attributes
        int len = attributes.getLength();
        Log.debug("PluginParser: handlePluginApi counted attributes ["
                + attributes.getLength() + "]");
        for (int i = 0; i < len; i++) {
            String attrName = attributes.getQName(i);
            String attrValue = attributes.getValue(attrName);
            Log.debug("PluginParser: " + attrName + " found.");
            if (attrName.equals(PLUGIN_API_ID)) {
                api.setId(attrValue);
                Log.debug("Setting " + attrName);
            } else if (attrName.equals(PLUGIN_API_CLASS)) {
                api.setApiClass(attrValue);
                Log.debug("Setting " + attrName);
            } else if (attrName.equals(PLUGIN_API_PATH)) {
                api.setPath(attrValue);
                Log.debug("Setting " + attrName);
            } else
                internalError(PLUGIN, attrName);
        }
        apis.add(api);
        this.pluginDesciptors.push(current);
        Log.debug("PluginParser: Leaving handlePluginApi.");
    }

    public void startDocument() throws SAXException {
        Log.debug("PluginParser: Touching startDocument.");
    }

    public void startElement(String uri, String elementName, String qName,
                             Attributes attributes) {
        Log.debug("PluginParser: Entering startElement.");
        Log.debug("PluginParser: element=[" + qName + "] attributes=["
                + attributes.getLength() + "]");
        handlePlugin(qName, attributes);
        handlePluginAction(qName, attributes);
        handlePluginService(qName, attributes);
        handlePluginCommands(qName, attributes);
        handlePluginApis(qName, attributes);
        Log.debug("PluginParser: Leaving startElement.");
    }

    public void warning(SAXParseException ex) {
        Log.error("Parsing failed due " + ex);
    }
}
