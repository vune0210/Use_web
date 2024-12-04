package org.tzi.use.usebackend.api_resp.state.ocl_eval;

import java.util.ArrayList;
import java.util.List;

public class EvalNode {
    List<EvalNode> children;
    String expr;
    String result;
    String exprAndValue;

    public EvalNode(org.tzi.use.uml.ocl.expr.EvalNode evalNode) {
        this.expr = evalNode.getExpressionStringRaw(true);
        this.exprAndValue = evalNode.getExprAndValue(true);
        this.result = evalNode.getResult().toString();
        this.children = new ArrayList<>();
        List<org.tzi.use.uml.ocl.expr.EvalNode> fChildren = evalNode.children();
        for (int i=0;i<fChildren.size();i++) {
            this.children.add(new EvalNode(fChildren.get(i)));
        }
    }

    public List<EvalNode> getChildren() {
        return children;
    }

    public void setChildren(List<EvalNode> children) {
        this.children = children;
    }

    public String getExpr() {
        return expr;
    }

    public void setExpr(String expr) {
        this.expr = expr;
    }

    public String getExprAndValue() {
        return exprAndValue;
    }

    public void setExprAndValue(String exprAndValue) {
        this.exprAndValue = exprAndValue;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}
