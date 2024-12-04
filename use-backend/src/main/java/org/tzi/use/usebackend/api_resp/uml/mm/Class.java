package org.tzi.use.usebackend.api_resp.uml.mm;

import com.google.common.base.Predicate;
import com.google.common.collect.Collections2;
import org.tzi.use.gui.main.ModelBrowserSorting;
import org.tzi.use.uml.mm.MAttribute;
import org.tzi.use.uml.mm.MClass;
import org.tzi.use.uml.mm.MOperation;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;

public class Class {
    private final String className;
    private final String[] fAttrValues;

    private final String[] fOprSignatures;

    public Class(MClass cls) {
        className = cls.name();

        List<MAttribute> fAttributes = cls.attributes();
        fAttributes = ModelBrowserSorting.getInstance().sortAttributes(fAttributes);

        fAttrValues = new String[fAttributes.size()];
        Color[] fAttrColors = new Color[fAttributes.size()];

        List<MOperation> fOperations = new ArrayList<>(Collections2.filter(cls.operations(), new Predicate<MOperation>() {
            @Override
            public boolean apply(MOperation input) {
                return !input.getAnnotationValue("View", "hideInDiagram").equals("true");
            }
        }));
        fOperations = ModelBrowserSorting.getInstance().sortOperations(fOperations);

        fOprSignatures = new String[fOperations.size()];
        Color[] fOperationColors = new Color[fOperations.size()];

        for (int i = 0; i < fAttributes.size(); i++) {
            MAttribute attr = fAttributes.get(i);
            fAttrValues[i] = attr.toString();
        }

        for (int i = 0; i < fOperations.size(); i++) {
            MOperation opr = fOperations.get(i);
            fOprSignatures[i] = opr.signature();
        }

    }

    public String getClassName() {
        return className;
    }

    public String[] getfAttrValues() {
        return fAttrValues;
    }

    public String[] getfOprSignatures() {
        return fOprSignatures;
    }
}
