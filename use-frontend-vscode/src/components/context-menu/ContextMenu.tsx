import {Menu} from "antd";
import {ItemType, MenuItemType} from "antd/es/menu/hooks/useItems";

interface Props {
    open: boolean;
    onClose: () => void;
    x: number;
    y: number;
    menuItems: ItemType<MenuItemType>[];
}

export const ContextMenu = (props: Props) => {
    return (
        <div
            style={{
                position: "fixed",
                zIndex: 2,
                width: "100vw",
                height: "100vh",
                top: 0,
                left: 0,
                display: props.open ? "block" : "none",
            }}
            onContextMenu={(e) => e.preventDefault()}
            onClick={props.onClose}
        >
            <div
                style={{
                    position: "absolute",
                    top: props.y,
                    left: props.x,
                    // border: "1px solid rgb(229, 229, 229)",
                    borderRadius: 8,
                    overflow: "hidden",
                    boxShadow:
                        "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
                }}
            >
                <Menu selectable={false} items={props.menuItems}/>
            </div>
        </div>
    );
};
