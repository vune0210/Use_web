package org.tzi.kodkod.comparison.ui.view;

import javax.swing.*;
import java.awt.*;

/**
 * Cell layouter of cells in matrix that presents the overview of comparison
 * results.
 * 
 * @author Jan Prien
 *
 */
public interface IComparisonButtonInMatrixTableCellLayouter {

	/**
	 * Layouts a cell.
	 * 
	 * @param button
	 *            The button the cell represents.
	 * @param value
	 *            The textual value of the cell.
	 * @return The button the cell represents.
	 */
	default JButton layoutButton(final JButton button, final Object value) {
		if (button == null) {
			throw new IllegalArgumentException();
		}
		button.setForeground(Color.black);
		button.setBackground(UIManager.getColor("Button.background"));
		button.setText(value != null ? value.toString() : "");
		return button;

	}

}
