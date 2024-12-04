package org.tzi.use.usebackend.controller.state;

import com.google.common.base.Predicate;
import com.google.common.collect.Collections2;
import com.google.common.collect.Lists;
import org.tzi.use.parser.ocl.OCLCompiler;
import org.tzi.use.uml.mm.MAttribute;
import org.tzi.use.uml.ocl.expr.Expression;
import org.tzi.use.uml.ocl.value.Value;
import org.tzi.use.uml.sys.*;
import org.tzi.use.uml.sys.soil.MAttributeAssignmentStatement;
import org.tzi.use.usebackend.api_resp.state.obj_prop.ObjectProperties;
import org.tzi.use.usebackend.api_resp.state.obj_prop.ObjectPropertyResp;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Collection;
import java.util.List;
import java.util.Map;

public class ObjectPropertyBE {
    private final MSystem fSystem;

    public ObjectPropertyBE(MSystem system) {
        this.fSystem = system;
    }

    public ObjectPropertyResp getObjectState(String objName) {
        MSystemState state = fSystem.state();
        MObject fObject = state.objectByName(objName);
        MObjectState objState = fObject.state(state);

        return new ObjectPropertyResp(new ObjectProperties(objState));
    }

    public ObjectPropertyResp updateObject(String objName, String[] newValues) {
        MSystemState state = fSystem.state();
        MObject fObject = state.objectByName(objName);
        MObjectState objState = fObject.state(state);
        Map<MAttribute, Value> fAttributeValueMap = objState.attributeValueMap();
        Collection<MAttribute> attributes = Collections2.filter(fAttributeValueMap.keySet(), new Predicate<MAttribute>() {
            @Override
            public boolean apply(MAttribute input) {
                return !input.isDerived();
            }
        });

        List<MAttribute> fAttributes = Lists.newArrayList(attributes);

        StringWriter errorOutput = new StringWriter();

        for (int i = 0; i < newValues.length; ++i) {
            MAttribute attribute = fAttributes.get(i);
            String newValue = newValues[i];
            String oldValue = fAttributeValueMap.get(attribute).toString();

            if (!newValue.equals(oldValue)) {
                Expression valueAsExpression =
                        OCLCompiler.compileExpression(
                                fSystem.model(),
                                fSystem.state(),
                                newValue,
                                "<input>",
                                new PrintWriter(errorOutput, true),
                                fSystem.varBindings());

//                if (valueAsExpression == null) {
//                    // Fail to compile. error already in errorOutput
//                }

                try {
                    fSystem.execute(
                            new MAttributeAssignmentStatement(
                                    fObject,
                                    attribute,
                                    valueAsExpression));

                } catch (MSystemException e) {
                    // TODO: check this
                    errorOutput.write(e.getMessage());
                }
            }
        }
        return new ObjectPropertyResp(true, errorOutput.toString());
    }
}
