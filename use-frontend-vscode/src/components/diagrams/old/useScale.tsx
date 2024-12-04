import {dia, V} from "jointjs";
import {useEffect, useState} from "react";

export interface UseJoinDiagramScale {
    scale: number;
    zoomIn: () => void;
    zoomOut: () => void;
}

export function useScale(): UseJoinDiagramScale {
    const [scale, setScale] = useState(1);

    const zoomOut = () => {
        setScale((value) => Math.max(0.2, value - 0.2));
    };

    const zoomIn = () => {
        setScale((value) => Math.min(3, value + 0.2));
    };

    return {scale, zoomIn, zoomOut};
}

export function usePaperScale(
    paperRef: React.MutableRefObject<dia.Paper | undefined>,
    scale: number
) {
    const [matrix, setMatrix] = useState(V.createSVGMatrix());
    useEffect(() => {
        const paperCurr = paperRef.current;
        if (paperCurr == null) return;

        const size = paperCurr.getComputedSize();
        paperCurr.translate(0, 0);
        paperCurr.scale(scale, scale, size.width / 2, size.height / 2);
        setMatrix(paperCurr.matrix());
    }, [paperRef, scale]);
    return matrix;
}
