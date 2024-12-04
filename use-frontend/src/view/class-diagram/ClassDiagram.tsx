import {useEffect} from "react";
import "../../components/diagrams/css/GraphApp.css";

import {loadClassDiagramThunk} from "../../store/class-diagram/classDiagramThunks";
import {useAppDispatch} from "../../store/hook";
import ClassDiagramPaper from "./ClassDiagramPaper";
import DraggableModal from "../../components/dialogs/DraggableModal";
import {useScale} from "../../components/diagrams/old";
import Toolbar from "../../components/diagrams/old/Toolbar";

const HEIGHT = 600;
const WIDTH = 850;

interface Props {
    visible: boolean;
    onClose: () => void;
}

function ClassDiagram({visible, onClose}: Props) {
    const dispatch = useAppDispatch();
    const {scale, zoomIn, zoomOut} = useScale();

    useEffect(() => {
        if (visible) {
            dispatch(loadClassDiagramThunk());
        }
    }, [dispatch, visible]);

    return (
        <DraggableModal
            open={visible}
            closable
            mask={false}
            onCancel={onClose}
            footer={null}
            title={<div>Class Diagram</div>}
        >
            <Toolbar
                zoomIn={zoomIn}
                zoomOut={zoomOut}
                reset={() => dispatch(loadClassDiagramThunk())}
            />

            <ClassDiagramPaper
                width={WIDTH}
                height={HEIGHT}
                theme="material"
                scale={scale}
            />
        </DraggableModal>
    );
}

export default ClassDiagram;
