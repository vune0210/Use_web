import {DiaNode} from "../../../components/diagram";
import {Position} from "../../../utils/types";
import {CommentNode} from "../types";

interface Props {
    node: CommentNode;
    initPosition: Position;
    onDblClick: () => any;
}

export function CommentDiaNode(props: Props) {
    return (
        <DiaNode
            id={props.node.id}
            deps={[]}
            initPosition={props.initPosition}
            onDblClick={props.onDblClick}
        >
            <div style={{height: 100, width: 100, border: "1px black"}}>
                {props.node.content}
            </div>
        </DiaNode>
    );
}
