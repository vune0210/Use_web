package org.tzi.use.usebackend.api_resp.utility_view.mdl_brw;

import java.util.ArrayList;
import java.util.List;

public class Node {
    private final String name;
    private final List<Node> children;

    public Node(String name) {
        this.name = name;
        this.children = new ArrayList();
    }

    public void appendChild(Node child) {
        this.children.add(child);
    }

    public String getName() {
        return name;
    }

    public List<Node> getChildren() {
        return children;
    }
}
