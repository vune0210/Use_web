package org.tzi.use.usebackend.api_resp.uml.sys;

import org.tzi.use.uml.sys.MLink;
import org.tzi.use.uml.sys.MLinkEnd;
import org.tzi.use.uml.sys.MLinkObject;

public class Link {
    String fAssociationName;
    LinkEnd[] linkEnds;
    String assocObjectLabel = null;

    public boolean isLinkObject = false;
    public boolean isVirtual = false;

    public Link(MLink link) {
        fAssociationName = link.association().name();
        MLinkEnd[] mLinkEnds = link.linkEnds().toArray(new MLinkEnd[0]);
        linkEnds = new LinkEnd[mLinkEnds.length];
        for (int i=0;i<mLinkEnds.length;i++){
            linkEnds[i] = new LinkEnd(mLinkEnds[i]);
        }
        if (link instanceof MLinkObject) {
            isLinkObject = true;
            assocObjectLabel = ((MLinkObject) link).name() + ":" + ((MLinkObject) link).cls().name();
        }
        isVirtual = link.isVirtual();
    }

    public String getAssocObjectLabel() {
        return assocObjectLabel;
    }

    public void setAssocObjectLabel(String assocObjectLabel) {
        this.assocObjectLabel = assocObjectLabel;
    }

    public String getfAssociationName() {
        return fAssociationName;
    }

    public void setfAssociationName(String fAssociationName) {
        this.fAssociationName = fAssociationName;
    }

    public LinkEnd[] getLinkEnds() {
        return linkEnds;
    }

    public void setLinkEnds(LinkEnd[] linkEnds) {
        this.linkEnds = linkEnds;
    }
}
