package org.tzi.use.usebackend.controller.utils;

import org.tzi.use.uml.mm.MOperation;
import org.tzi.use.uml.sys.MOperationCall;
import org.tzi.use.uml.sys.MSystem;
import org.tzi.use.usebackend.api_resp.utility_view.CallStackListResp;
import org.tzi.use.util.StringUtil;

import java.util.ArrayList;
import java.util.Deque;

public class CallStackBE {
    MSystem fSystem;
    private boolean fShowCall = false;

    public CallStackBE(MSystem fSystem) {
        this.fSystem = fSystem;
    }

    public CallStackListResp getCallStack() {
        ArrayList<String> list = new ArrayList<>();

        Deque<MOperationCall> callStack = fSystem.getCallStack();

        if (!callStack.isEmpty()) {
            int current = 1;
            for (MOperationCall oc : callStack) {
                MOperation op = oc.getOperation();

                StringBuilder line = new StringBuilder();
                line.append(current++);
                line.append(". ");
                if (fShowCall) {
                    line.append(oc.getSelf().name());
                    line.append(".");
                } else {
                    line.append(op.cls().name());
                    line.append("::");
                }
                line.append(op.name());
                line.append("(");
                if (fShowCall) {
                    StringUtil.fmtSeq(
                            line,
                            oc.getArgumentsAsNamesAndValues().values(),
                            ",");
                }
                line.append(")");
                list.add(line.toString());
            }
        }

        return new CallStackListResp(list);
    }
}
