package org.tzi.kodkod.clever.csp.bool;

import org.tzi.kodkod.clever.csp.IVariable;
import org.tzi.kodkod.clever.csp.integer.IIntegerResultTerm;

import java.util.Map;

/**
 * Term with a boolean result on evaluation. The term is about two integer
 * terms. The term has a specific operator.
 * 
 * @author Jan Prien
 *
 */
public abstract class AbstractBooleanResultForBinaryIntegerArgumentTermWithInfixOperator
		extends AbstractBooleanResultForBinaryIntegerArgumentTerm {

	/** {@inheritDoc} */
	public AbstractBooleanResultForBinaryIntegerArgumentTermWithInfixOperator(IIntegerResultTerm left,
			IIntegerResultTerm right) {
		super(left, right);
	}

	@Override
	public String toRepresentation(Map<IVariable<?>, String> variableOverwriteNames) {
		return "( " + getLeft().toRepresentation(variableOverwriteNames) + " " + getOp() + " "
				+ getRight().toRepresentation(variableOverwriteNames) + " )";
	}

	/**
	 * Returns the textual representation of the operator.
	 * 
	 * @return The textual representation of the operator.
	 */
	protected abstract String getOp();
}
