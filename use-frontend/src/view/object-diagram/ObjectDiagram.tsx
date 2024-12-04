import {useEffect} from "react";
import "../../components/diagrams/css/GraphApp.css";

import {useAppDispatch} from "../../store/hook";
import {loadObjectDiagramThunk} from "../../store/object-diagram/objectDiagramThunks";
import ClassDiagramPaper from "./ObjectDiagramPaper";
import DraggableModal from "../../components/dialogs/DraggableModal";
import Toolbar from "../../components/diagrams/old/Toolbar";
import {useScale} from "../../components/diagrams/old";

const HEIGHT = 600;
const WIDTH = 850;

interface Props {
    visible: boolean;
    onClose: () => void;
}

function ObjectDiagram({visible, onClose}: Props) {
    const dispatch = useAppDispatch();
    const {scale, zoomIn, zoomOut} = useScale();

    useEffect(() => {
        if (visible) {
            dispatch(loadObjectDiagramThunk());
        }
    }, [dispatch, visible]);

    return (
        <DraggableModal
            id="obj-dia-modal"
            open={visible}
            closable
            mask={false}
            onCancel={onClose}
            footer={null}
            title={<div>Object Diagram</div>}
        >
            <Toolbar
                zoomIn={zoomIn}
                zoomOut={zoomOut}
                reset={() => dispatch(loadObjectDiagramThunk())}
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

export default ObjectDiagram;
