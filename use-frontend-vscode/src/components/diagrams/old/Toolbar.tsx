import {useState} from "react";
import "../css/Toolbar.css";

interface Props {
    zoomOut: () => any;
    zoomIn: () => any;
    reset: () => any;
}

function Toolbar({zoomOut, zoomIn, reset}: Props) {
    const [copied, setCopied] = useState(false);

    return (
        <div className="toolbar" style={{position: "absolute", zIndex: 100}}>
            <button onClick={zoomOut}>Zoom Out</button>
            <button onClick={zoomIn}>Zoom In</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}

export default Toolbar;
