package org.tzi.kodkod.clever.csp.integer;

import org.tzi.kodkod.clever.csp.IVariable;

import java.util.Map;

/**
 * Term with a integer result on evaluation. The term is about two integer
 * terms. The term has a specific operator.
 * 
 * @author Jan Prien
 *
 */
public abstract class AbstractIntegerResultForBinaryIntegerArgumentTermWithInfixAndZirkumfixOperator
		extends AbstractIntegerResultForBinaryIntegerArgumentTerm {

	/** {@inheritDoc} */
	public AbstractIntegerResultForBinaryIntegerArgumentTermWithInfixAndZirkumfixOperator(IIntegerResultTerm left,
			IIntegerResultTerm right) {
		super(left, right);
	}

	@Override
	public String toRepresentation(Map<IVariable<?>, String> variableOverwriteNames) {
		return getPrefixOp() + getLeft().toRepresentation(variableOverwriteNames) + getInfixOp()
				+ getRight().toRepresentation(variableOverwriteNames) + getSuffixOp();
	}

	/**
	 * Returns the prefix part of the textual representation of the operator.
	 * 
	 * @return The textual representation of the operator.
	 */
	protected abstract String getPrefixOp();

	/**
	 * Returns the infix part of the textual representation of the operator.
	 * 
	 * @return The textual representation of the operator.
	 */
	protected String getInfixOp() {
		return " , ";
	}

	/**
	 * Returns the suffix part of the textual representation of the operator.
	 * 
	 * @return The textual representation of the operator.
	 */
	protected String getSuffixOp() {
		return " )";
	}

}
