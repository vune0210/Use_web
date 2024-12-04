package org.tzi.use.usebackend.controller.state;

import org.tzi.use.config.Options;
import org.tzi.use.parser.ocl.OCLCompiler;
import org.tzi.use.uml.ocl.expr.Evaluator;
import org.tzi.use.uml.ocl.expr.Expression;
import org.tzi.use.uml.ocl.expr.MultiplicityViolationException;
import org.tzi.use.uml.ocl.value.Value;
import org.tzi.use.uml.sys.MSystem;
import org.tzi.use.usebackend.api_resp.ApiResponse;
import org.tzi.use.usebackend.api_resp.state.ocl_eval.EvalNode;
import org.tzi.use.usebackend.api_resp.state.ocl_eval.EvalOclExprResp;
import org.tzi.use.util.StringUtil;

import java.io.PrintWriter;
import java.io.StringWriter;

public class EvaluateOCLExpr {
    MSystem fSystem;
    private Evaluator evaluator;

    public EvaluateOCLExpr(MSystem fSystem) {
        this.fSystem = fSystem;
    }

    public ApiResponse evaluate(String in, boolean evalTree) {
        if (this.fSystem == null) {
            return new ApiResponse(false, "No system!");
        }

        // send error output to result window and msg stream
        StringWriter msgWriter = new StringWriter();
        PrintWriter out = new PrintWriter(msgWriter, true);


        // compile query
        Expression expr = OCLCompiler.compileExpression(
                fSystem.model(),
                fSystem.state(),
                in,
                "Error",
                out,
                fSystem.varBindings());


        out.flush();

        // compile errors?
        if (expr == null) {
            // try to parse error message and set caret to error position
            String msg = msgWriter.toString();
            int colon1 = msg.indexOf(':');
            if (colon1 != -1) {
                int colon2 = msg.indexOf(':', colon1 + 1);
                int colon3 = msg.indexOf(':', colon2 + 1);

                try {
                    int line = Integer.parseInt(msg.substring(colon1 + 1,
                            colon2));
                    int column = Integer.parseInt(msg.substring(colon2 + 1,
                            colon3));
                    int caret = 1 + StringUtil.nthIndexOf(in, line - 1,
                            Options.LINE_SEPARATOR);
                    caret += column;
                } catch (NumberFormatException ex) { }
            }
            return new ApiResponse(false, "compile errors?");
        }

        try {
            // evaluate it with current system state
            evaluator = new Evaluator(evalTree);
            Value val = evaluator.eval(expr, fSystem.state(), fSystem
                    .varBindings());

            // print result
            return new EvalOclExprResp(val.toStringWithType(), msgWriter.toString(), new EvalNode(evaluator
                    .getEvalNodeRoot()));
        } catch (MultiplicityViolationException e) {
            return new ApiResponse(false, "Could not evaluate. " + e.getMessage());
        }
    }
}
