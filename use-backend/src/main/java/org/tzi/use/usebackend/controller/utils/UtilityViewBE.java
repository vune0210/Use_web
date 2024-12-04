package org.tzi.use.usebackend.controller.utils;

import org.tzi.use.uml.sys.MSystem;
import org.tzi.use.uml.sys.soil.MEnterOperationStatement;
import org.tzi.use.uml.sys.soil.MExitOperationStatement;
import org.tzi.use.uml.sys.soil.MStatement;
import org.tzi.use.usebackend.api_resp.utility_view.CommandListResp;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class UtilityViewBE {
    private final MSystem fSystem;

    public UtilityViewBE(MSystem system) {
        fSystem = system;
    }

    public CommandListResp getCommandList() {
        List<String> commandList = new ArrayList<>();

        List<MStatement> evaluatedStatements = fSystem.getEvaluatedStatements();
        int numEvaluatedStatements = evaluatedStatements.size();

        if (numEvaluatedStatements > 0) {
            Stack<Integer> numbering = new Stack<>();
            Stack<String> prefixes = new Stack<>();

            numbering.push(Integer.valueOf(0));
            prefixes.push("");

            String entry;
            String prefix;
            MStatement statement;

            for (int i = 0; i < numEvaluatedStatements; ++i) {
                statement = evaluatedStatements.get(i);
                int number = numbering.pop();
                numbering.push(++number);

                prefix = prefixes.peek() + number + ".";
                entry = prefix + " " + statement.getShellCommand();

                if (statement instanceof MEnterOperationStatement) {
                    numbering.push(0);
                    prefixes.push(prefix);
                } else if (statement instanceof MExitOperationStatement) {
                    numbering.pop();
                    prefixes.pop();
                }

                commandList.add(entry);
            }
        }
        return new CommandListResp(commandList);
    }
}
