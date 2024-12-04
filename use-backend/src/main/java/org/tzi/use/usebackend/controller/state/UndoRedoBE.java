package org.tzi.use.usebackend.controller.state;

import org.tzi.use.main.Session;
import org.tzi.use.uml.sys.MSystem;
import org.tzi.use.uml.sys.MSystemException;
import org.tzi.use.uml.sys.soil.MEnterOperationStatement;
import org.tzi.use.uml.sys.soil.MExitOperationStatement;
import org.tzi.use.uml.sys.soil.MStatement;
import org.tzi.use.usebackend.api_resp.ApiResponse;
import org.tzi.use.usebackend.api_resp.state.undo_redo.UndoRedoResp;

public class UndoRedoBE {
    Session fSession;

    public UndoRedoBE(Session fSession) {
        this.fSession = fSession;
    }

    public UndoRedoResp getUndoRedoAvailability() {
        if(!fSession.hasSystem()){
            return new UndoRedoResp(false, false);
        }
        String nextToUndo = fSession.system().getUndoDescription();
        String nextToRedo =
                fSession.system().getRedoDescription();

        return  new UndoRedoResp(nextToUndo, nextToRedo);
    }

    public ApiResponse undo() {
        if (fSession.hasSystem() && fSession.system().isExecutingStatement()) {
            return new ApiResponse(false, "The system is currently executing a statement.\nPlease end the execution before undoing.");
        }

        try {
            fSession.system().undoLastStatement();
            return this.getUndoRedoAvailability();
        } catch (MSystemException ex) {
            return new ApiResponse(false, ex.getMessage());
        }
    }

    public ApiResponse redo() {
        if (fSession.hasSystem() && fSession.system().isExecutingStatement()) {
            return new ApiResponse(false, "The system is currently executing a statement.\nPlease end the execution before redoing.");
        }

        MSystem system = fSession.system();

        MStatement nextToRedo = system.nextToRedo();
        if ((nextToRedo instanceof MEnterOperationStatement) ||
                (nextToRedo instanceof MExitOperationStatement)) {
            return new ApiResponse(false, "openter/opexit can only be redone in the shell");
        }

        try {
            system.redoStatement();
            return this.getUndoRedoAvailability();
        } catch (MSystemException ex) {
            return new ApiResponse(false, ex.getMessage());
        }
    }
}
