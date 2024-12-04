package org.tzi.use.usebackend.api_resp.state.obj_prop;

import com.google.common.base.Predicate;
import com.google.common.collect.Collections2;
import com.google.common.collect.Lists;
import org.tzi.use.uml.mm.MAttribute;
import org.tzi.use.uml.ocl.value.Value;
import org.tzi.use.uml.sys.MObjectState;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

public class ObjectProperties {
    String[] fValues;
    ArrayList<String> fAttributes;

    public ObjectProperties(MObjectState objState) {
        this.fAttributes = new ArrayList<>();
        Map<MAttribute, Value> fAttributeValueMap = objState.attributeValueMap();
        Collection<MAttribute> attributes = Collections2.filter(fAttributeValueMap.keySet(), new Predicate<MAttribute>() {
            @Override
            public boolean apply(MAttribute input) {
                return !input.isDerived();
            }
        });

        List<MAttribute> fAttributesList = Lists.newArrayList(attributes);
        fValues = new String[fAttributesList.size()];
        for (int i = 0; i < fValues.length; i++) {
            fAttributes.add(fAttributesList.get(i).toString());
            fValues[i] = fAttributeValueMap.get(fAttributesList.get(i)).toString();
        }
    }

    public String[] getfValues() {
        return fValues;
    }

    public ArrayList<String> getfAttributes() {
        return fAttributes;
    }
}
