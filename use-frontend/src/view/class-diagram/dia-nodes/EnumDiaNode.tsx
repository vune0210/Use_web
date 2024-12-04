import {DiaNode} from "../../../components/diagram";
import {EnumElement} from "../../../store/class-diagram/types";
import {Position} from "../../../utils/types";

interface Props {
    node: EnumElement;
    initPosition: Position;
}

export function EnumDiaNode(props: Props) {
    return (
        <DiaNode
            key={props.node.className}
            id={props.node.className}
            deps={[]}
            initPosition={props.initPosition}
        >
            <table style={{whiteSpace: "nowrap"}}>
                <tr>
                    <th>
                        <div>
                            <i>{`<<enumeration>>`}</i>
                        </div>
                        {props.node.className}
                    </th>
                </tr>
                <tr>
                    <td>
                        {props.node.literals.map((attr) => (
                            <div>{attr}</div>
                        ))}
                    </td>
                </tr>
            </table>
        </DiaNode>
    );
}
