import {DiaNode} from "../../../components/diagram";
import {ClassElement} from "../../../store/class-diagram/types";
import {Position} from "../../../utils/types";
import "./ClassDiaNode.css"

interface Props {
    node: ClassElement;
    showAttributes: boolean;
    showOperations: boolean;
    initPosition: Position;
}

export function ClassDiaNode(props: Props) {
    return (
        <DiaNode
            initPosition={props.initPosition}
            key={props.node.className}
            id={props.node.className}
            deps={[props.node]}
        >
            <div className="dia-node class-node container">
                <div className="classname">
                    {props.node.className}
                </div>
                {props.showAttributes ? (
                    <div className="attribute">
                        {props.node.attributes.map((attr) => (
                            <div>{attr}</div>
                        ))}
                    </div>
                ) : null}

                {props.showOperations ? (
                    <div className="operation">
                        {props.node.operations.map((op) => (
                            <div>{op}</div>
                        ))}
                    </div>
                ) : null}
            </div>
        </DiaNode>
    );
}
