import {DiaNode} from "../../../components/diagram";
import {Position} from "../../../utils/types";
import "./ObjectDiaNode.css"
import {Object} from "../../../api";

interface Props {
    node: Object;
    showAttributes: boolean;
    showStates: boolean;
    initPosition: Position;
}

export function ObjectDiaNode(props: Props) {
    return (
        <DiaNode
            initPosition={props.initPosition}
            id={props.node.fLabel}
            deps={[props.node]}
        >
            <div className="dia-node object-node container">
                <div className="objectname">
                    {props.node.fLabel}
                </div>
                {props.showAttributes ? (
                    <div className="attribute">
                        {props.node.fValues.map((attr) => (
                            <div>{attr}</div>
                        ))}
                    </div>
                ) : null}

                {props.showStates ? (
                    <div className="operation">
                        {props.node.fStateValues.map((state) => (
                            <div>{state}</div>
                        ))}
                    </div>
                ) : null}
            </div>
        </DiaNode>
    );
}
