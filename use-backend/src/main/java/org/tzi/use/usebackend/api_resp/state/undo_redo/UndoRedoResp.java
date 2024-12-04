package org.tzi.use.usebackend.api_resp.state.undo_redo;

import jline.internal.Nullable;
import org.tzi.use.usebackend.api_resp.ApiResponse;

public class UndoRedoResp extends ApiResponse {
    public boolean undoEnabled;
    public String undoDescription;
    public boolean redoEnabled;
    public String redoDescription;

    public UndoRedoResp(boolean undoEnabled, boolean redoEnabled) {
        this.undoEnabled = undoEnabled;
        this.redoEnabled = redoEnabled;
    }

    public UndoRedoResp(@Nullable String undoDescription, @Nullable String redoDescription) {
        this.undoEnabled = undoDescription != null;
        this.undoDescription = undoDescription;
        this.redoEnabled = redoDescription != null;
        this.redoDescription = redoDescription;
    }

}
