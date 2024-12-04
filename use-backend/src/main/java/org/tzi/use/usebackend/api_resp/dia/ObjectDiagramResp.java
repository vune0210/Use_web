package org.tzi.use.usebackend.api_resp.dia;

import org.tzi.use.usebackend.api_resp.ApiResponse;
import org.tzi.use.usebackend.api_resp.uml.sys.Link;
import org.tzi.use.usebackend.api_resp.uml.sys.ObjectState;

import java.util.ArrayList;

public class ObjectDiagramResp extends ApiResponse {
    private final ArrayList<ObjectState> linkedObjects;
    private final ArrayList<Link> links;


    public ObjectDiagramResp(boolean success, String message) {
        super(success, message);
        this.linkedObjects = new ArrayList<>();
        this.links = new ArrayList<>();
    }

    public ObjectDiagramResp(ArrayList<ObjectState> objects, ArrayList<Link> links) {
        super();
        this.linkedObjects = objects;
        this.links = links;
    }

    public ArrayList<ObjectState> getLinkedObjects() {
        return linkedObjects;
    }

    public ArrayList<Link> getLinks() {
        return links;
    }
}
