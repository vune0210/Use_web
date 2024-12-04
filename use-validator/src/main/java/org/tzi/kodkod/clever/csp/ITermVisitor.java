package org.tzi.kodkod.clever.csp;

import org.tzi.kodkod.clever.csp.bool.*;
import org.tzi.kodkod.clever.csp.integer.*;
import org.tzi.kodkod.clever.csp.real.*;

/**
 * Visitor for Terms ({@link ITerm}). The visitor must implement a specific
 * handling for selected types of terms.
 * 
 * @author Jan Prien
 *
 */
public interface ITermVisitor {

	void visitBooleanResultForBooleanAndBooleanTerm(
			BooleanResultForBooleanAndBooleanTerm booleanResultForBooleanAndBooleanTerm);

	void visitBooleanResultForBooleanImpliesBooleanTerm(
			BooleanResultForBooleanImpliesBooleanTerm booleanResultForBooleanImpliesBooleanTerm);

	void visitBooleanResultForBooleanOrBooleanTerm(
			BooleanResultForBooleanOrBooleanTerm booleanResultForBooleanOrBooleanTerm);

	void visitBooleanResultForBooleanXOrBooleanTerm(
			BooleanResultForBooleanXOrBooleanTerm booleanResultForBooleanXOrBooleanTerm);

	void visitBooleanResultForIntegerEqualIntegerTerm(
			BooleanResultForIntegerEqualIntegerTerm booleanResultForIntegerEqualIntegerTerm);

	void visitBooleanResultForIntegerEqualRealTerm(
			BooleanResultForIntegerEqualRealTerm booleanResultForIntegerEqualRealTerm);

	void visitBooleanResultForIntegerGreaterThanEqualIntegerTerm(
			BooleanResultForIntegerGreaterThanEqualIntegerTerm booleanResultForIntegerGreaterThanEqualIntegerTerm);

	void visitBooleanResultForIntegerGreaterThanEqualRealTerm(
			BooleanResultForIntegerGreaterThanEqualRealTerm booleanResultForIntegerGreaterThanEqualRealTerm);

	void visitBooleanResultForIntegerGreaterThanIntegerTerm(
			BooleanResultForIntegerGreaterThanIntegerTerm booleanResultForIntegerGreaterThanIntegerTerm);

	void visitBooleanResultForIntegerGreaterThanRealTerm(
			BooleanResultForIntegerGreaterThanRealTerm booleanResultForIntegerGreaterThanRealTerm);

	void visitBooleanVariable(BooleanVariable booleanVariable);

	void visitIntegerVariable(IntegerVariable integerVariable);

	void visitRealVariable(RealVariable realVariable);

	void visitBooleanResultForIntegerLessThanEqualIntegerTerm(
			BooleanResultForIntegerLessThanEqualIntegerTerm booleanResultForIntegerLessThanEqualIntegerTerm);

	void visitBooleanResultForIntegerLessThanEqualRealTerm(
			BooleanResultForIntegerLessThanEqualRealTerm booleanResultForIntegerLessThanEqualRealTerm);

	void visitBooleanResultForIntegerLessThanIntegerTerm(
			BooleanResultForIntegerLessThanIntegerTerm booleanResultForIntegerLessThanIntegerTerm);

	void visitBooleanResultForIntegerLessThanRealTerm(
			BooleanResultForIntegerLessThanRealTerm booleanResultForIntegerLessThanRealTerm);

	void visitBooleanResultForIntegerUnequalIntegerTerm(
			BooleanResultForIntegerUnequalIntegerTerm booleanResultForIntegerUnequalIntegerTerm);

	void visitBooleanResultForIntegerUnequalRealTerm(
			BooleanResultForIntegerUnequalRealTerm booleanResultForIntegerUnequalRealTerm);

	void visitBooleanResultForNegateBooleanTerm(BooleanResultForNegateBooleanTerm booleanResultForNegateBooleanTerm);

	void visitBooleanResultForRealEqualRealTerm(BooleanResultForRealEqualRealTerm booleanResultForRealEqualRealTerm);

	void visitBooleanResultForRealGreaterThanEqualIntegerTerm(
			BooleanResultForRealGreaterThanEqualIntegerTerm booleanResultForRealGreaterThanEqualIntegerTerm);

	void visitBooleanResultForRealGreaterThanEqualRealTerm(
			BooleanResultForRealGreaterThanEqualRealTerm booleanResultForRealGreaterThanEqualRealTerm);

	void visitBooleanResultForRealGreaterThanIntegerTerm(
			BooleanResultForRealGreaterThanIntegerTerm booleanResultForRealGreaterThanIntegerTerm);

	void visitBooleanResultForRealGreaterThanRealTerm(
			BooleanResultForRealGreaterThanRealTerm booleanResultForRealGreaterThanRealTerm);

	void visitBooleanResultForRealLessThanEqualIntegerTerm(
			BooleanResultForRealLessThanEqualIntegerTerm booleanResultForRealLessThanEqualIntegerTerm);

	void visitIntegerResultForIntegerModuloIntegerTerm(
			IntegerResultForIntegerModuloIntegerTerm integerResultForIntegerModuloIntegerTerm);

	void visitIntegerResultForIntegerSubtractionIntegerTerm(
			IntegerResultForIntegerSubtractionIntegerTerm integerResultForIntegerSubtractionIntegerTerm);

	void visitIntegerResultForMaxIntegerIntegerTerm(
			IntegerResultForMaxIntegerIntegerTerm integerResultForMaxIntegerIntegerTerm);

	void visitIntegerResultForAbsoluteIntegerTerm(
			IntegerResultForAbsoluteIntegerTerm integerResultForIntegerResultForAbsoluteIntegerTerm);

	void visitIntegerResultForMinIntegerTerm(IntegerResultForMinIntegerTerm integerResultForMinIntegerTerm);

	void visitIntegerResultForNegateIntegerTerm(IntegerResultForNegateIntegerTerm integerResultForNegateIntegerTerm);

	void visitRealResultForFloorRealTerm(RealResultForFloorRealTerm realResultForFloorRealTerm);

	void visitRealResultForCeilRealTerm(RealResultForCeilRealTerm realResultForCeilRealTerm);

	void visitRealResultForIntegerLogarithmRealTerm(
			RealResultForIntegerLogarithmRealTerm realResultForIntegerLogarithmRealTerm);

	void visitRealResultForIntegerLogarithmIntegerTerm(
			RealResultForIntegerLogarithmIntegerTerm realResultForIntegerLogarithmIntegerTerm);

	void visitRealResultForMaxRealRealTerm(RealResultForMaxRealRealTerm realResultForMaxRealRealTerm);

	void visitRealResultForMinRealIntegerTerm(RealResultForMinRealIntegerTerm realResultForMinRealIntegerTerm);

	void visitRealResultForRealDivisionIntegerTerm(
			RealResultForRealDivisionIntegerTerm realResultForRealDivisionIntegerTerm);

	void visitRealResultForNegateRealTerm(RealResultForNegateRealTerm realResultForNegateRealTerm);

	void visitIntegerResultForIntegerExponentiationIntegerTerm(
			IntegerResultForIntegerExponentiationIntegerTerm integerResultForIntegerlExponentiationIntegerTerm);

	void visitRealResultForMaxRealIntegerTerm(RealResultForMaxRealIntegerTerm realResultForMaxRealIntegerTerm);

	void visitRealResultForRealAdditionIntegerTerm(
			RealResultForRealAdditionIntegerTerm realResultForRealAdditionIntegerTerm);

	void visitRealResultForRealAdditionRealTerm(RealResultForRealAdditionRealTerm realResultForRealAdditionRealTerm);

	void visitRealResultForRealDivisionRealTerm(RealResultForRealDivisionRealTerm realResultForRealDivisionRealTerm);

	void visitRealResultForRealLogarithmIntegerTerm(
			RealResultForRealLogarithmIntegerTerm realResultForRealLogarithmIntegerTerm);

	void visitRealResultForRealLogarithmRealTerm(RealResultForRealLogarithmRealTerm realResultForRealLogarithmRealTerm);

	void visitIntegerResultForRoundRealTerm(IntegerResultForRoundRealTerm integerResultForRoundRealTerm);

	void visitIntegerResultForFloorRealTerm(IntegerResultForFloorRealTerm integerResultForFloorRealTerm);

	void visitBooleanResultForRealUnequalRealTerm(
			BooleanResultForRealUnequalRealTerm booleanResultForRealUnequalRealTerm);

	void visitBooleanResultForRealLessThanEqualRealTerm(
			BooleanResultForRealLessThanEqualRealTerm booleanResultForRealLessThanEqualRealTerm);

	void visitBooleanResultForRealLessThanRealTerm(
			BooleanResultForRealLessThanRealTerm booleanResultForRealLessThanRealTerm);

	void visitIntegerResultForIntegerMultiplicationIntegerTerm(
			IntegerResultForIntegerMultiplicationIntegerTerm integerResultForIntegerMultiplicationIntegerTerm);

	void visitBooleanResultForRealLessThanIntegerTerm(
			BooleanResultForRealLessThanIntegerTerm booleanResultForRealLessThanIntegerTerm);

	void visitIntegerResultForIntegerDivisionIntegerTerm(
			IntegerResultForIntegerDivisionIntegerTerm integerResultForIntegerDivisionIntegerTerm);

	void visitIntegerResultForCeilRealTerm(IntegerResultForCeilRealTerm integerResultForCeilRealTerm);

	void visitIntegerResultForIntegerAdditionIntegerTerm(
			IntegerResultForIntegerAdditionIntegerTerm integerResultForIntegerAdditionIntegerTerm);

	void visitRealResultForMinRealRealTerm(RealResultForMinRealRealTerm realResultForMinRealRealTerm);

	void visitRealResultForRealMultiplicationIntegerTerm(
			RealResultForRealMultiplicationIntegerTerm realResultForRealMultiplicationIntegerTerm);

	void visitRealResultForRealMultiplicationRealTerm(
			RealResultForRealMultiplicationRealTerm realResultForRealMultiplicationRealTerm);

	void visitRealResultForRealSubtractionIntegerTerm(
			RealResultForRealSubtractionIntegerTerm realResultForRealSubtractionIntegerTerm);

	void visitRealResultForRealSubtractionRealTerm(
			RealResultForRealSubtractionRealTerm realResultForRealSubtractionRealTerm);

}