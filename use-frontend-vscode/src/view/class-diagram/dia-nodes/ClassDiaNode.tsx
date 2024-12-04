import {DiaNode} from "../../../components/diagram";
import {ClassElement} from "../../../store/class-diagram/types";
import {Position} from "../../../utils/types";

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
            {/* <Table bordered columns={[
        {
          key: "a",

        }
      ]} /> */}
            <table style={{whiteSpace: "nowrap"}}>
                <tr>
                    <th>{props.node.className}</th>
                </tr>
                {props.showAttributes ? (
                    <tr>
                        <td>
                            {props.node.attributes.map((attr) => (
                                <div>{attr}</div>
                            ))}
                        </td>
                    </tr>
                ) : null}

                {props.showOperations ? (
                    <tr>
                        <td>
                            {props.node.operations.map((op) => (
                                <div>{op}</div>
                            ))}
                        </td>
                    </tr>
                ) : null}
            </table>
        </DiaNode>
    );
}
