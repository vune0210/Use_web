package org.tzi.kodkod.clever.csp.real;

import org.tzi.kodkod.clever.csp.IVariable;

import java.util.Map;

/**
 * Term with a real result on evaluation. The term is about two real terms. The
 * term has a specific operator.
 * 
 * @author Jan Prien
 *
 */
public abstract class AbstractRealResultForBinaryRealArgumentTermWithInfixOperator
		extends AbstractRealResultForBinaryRealArgumentTerm {

	/** {@inheritDoc} */
	public AbstractRealResultForBinaryRealArgumentTermWithInfixOperator(IRealResultTerm left, IRealResultTerm right) {
		super(left, right);
	}

	@Override
	public String toRepresentation(Map<IVariable<?>, String> variableOverwriteNames) {
		return "( " + getLeft().toRepresentation(variableOverwriteNames) + " " + getInfixOp() + " "
				+ getRight().toRepresentation(variableOverwriteNames) + " )";
	}

	/**
	 * Returns the infix part of the textual representation of the operator.
	 * 
	 * @return The textual representation of the operator.
	 */
	protected abstract String getInfixOp();

}
