package org.tzi.kodkod.clever.csp.bool;

import org.tzi.kodkod.clever.csp.IVariable;
import org.tzi.kodkod.clever.csp.real.IRealResultTerm;

import java.util.HashSet;
import java.util.Set;

/**
 * Term with a boolean result on evaluation. The term is about two real terms.
 * 
 * @author Jan Prien
 *
 */
public abstract class AbstractBooleanResultForBinaryRealArgumentTerm extends AbstractBooleanResultTerm {

	/**
	 * The first term, this term is about.
	 */
	private final IRealResultTerm left;

	/**
	 * The second term, this term is about.
	 */
	private final IRealResultTerm right;

	/**
	 * Constructs an object.
	 * 
	 * @param left
	 *            The first term, the term is about.
	 * @param right
	 *            The second term, the term is about.
	 */
	public AbstractBooleanResultForBinaryRealArgumentTerm(IRealResultTerm left, IRealResultTerm right) {
		if (left == null || right == null) {
			throw new IllegalArgumentException();
		}
		this.left = left;
		this.right = right;
	}

	public IRealResultTerm getRight() {
		return right;
	}

	public IRealResultTerm getLeft() {
		return left;
	}

	@Override
	public Set<IVariable<?>> getVariables() {
		Set<IVariable<?>> variables = new HashSet<>();
		variables.addAll(getLeft().getVariables());
		variables.addAll(getRight().getVariables());
		return variables;
	}

}
