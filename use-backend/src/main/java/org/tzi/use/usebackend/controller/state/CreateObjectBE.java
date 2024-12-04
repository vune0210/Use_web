package org.tzi.use.usebackend.controller.state;

import org.tzi.use.uml.mm.MAssociationClass;
import org.tzi.use.uml.mm.MClass;
import org.tzi.use.uml.sys.MSystem;
import org.tzi.use.uml.sys.MSystemException;
import org.tzi.use.uml.sys.soil.MNewObjectStatement;
import org.tzi.use.usebackend.api_resp.state.crte_obj.CreateObjResp;
import org.tzi.use.util.USEWriter;

import java.util.ArrayList;
import java.util.Objects;

public class CreateObjectBE {
    private final MSystem fSystem;

    public CreateObjectBE(MSystem system) {
        this.fSystem = system;
    }

    public CreateObjResp getClassList() {
        ArrayList<String> fClasses = new ArrayList(fSystem.model().classes().size());
        // create class list and label
        for (MClass cls : fSystem.model().classes()) {
            if (!(cls instanceof MAssociationClass))
                fClasses.add(cls.name());
        }
        return new CreateObjResp(fClasses);
    }

    public void createObject(String objectClassName, String objectName) throws MSystemException {
        for (MClass cls : fSystem.model().classes()) {
            if (Objects.equals(cls.name(), objectClassName)) {
                this.createObject(cls, objectName);
                return;
            }
        }
        throw new RuntimeException("No class name = " + objectClassName);
    }

    public void createObject(MClass objectClass, String objectName) throws MSystemException {
        MNewObjectStatement statement =
                new MNewObjectStatement(objectClass, objectName);

        USEWriter.getInstance().protocol(
                "[GUI] " + statement.getShellCommand().substring(1));

        fSystem.execute(statement);
    }
}
