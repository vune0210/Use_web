package org.tzi.kodkod.clever.csp.integer;

import org.tzi.kodkod.clever.csp.ITermVisitor;
import org.tzi.kodkod.clever.csp.IVariable;

import java.util.Map;

/**
 * Term for unary "-".
 * 
 * @author Jan Prien
 *
 */
public final class IntegerResultForNegateIntegerTerm extends AbstractIntegerResultForUnaryIntegerArgumentTerm {

	/** {@inheritDoc} */
	public IntegerResultForNegateIntegerTerm(IIntegerResultTerm value) {
		super(value);
	}

	@Override
	public String toRepresentation(Map<IVariable<?>, String> variableOverwriteNames) {
		return "( - " + getValue().toRepresentation(variableOverwriteNames) + " )";
	}

	@Override
	public void processWith(ITermVisitor iTermVisitor) {
		iTermVisitor.visitIntegerResultForNegateIntegerTerm(this);
	}
}
