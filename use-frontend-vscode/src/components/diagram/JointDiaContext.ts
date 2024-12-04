import {dia} from "jointjs";
import React from "react";

export interface IJointDiagramContext {
    graph?: dia.Graph;
    paper?: dia.Paper;
}

export const JointDiagramContext = React.createContext<IJointDiagramContext>(
    {}
);
