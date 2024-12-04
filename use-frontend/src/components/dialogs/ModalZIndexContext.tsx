import {createContext, PropsWithChildren, useMemo, useState} from "react";

interface IModalZIndexContext {
    activeModalId: string;
    setActiveModalId: (modalId: string) => void;
}

export const ModalZIndexContext = createContext<IModalZIndexContext>({
    activeModalId: "",
    setActiveModalId: () => null,
});

export const ModalZIndexProvider = (props: PropsWithChildren) => {
    const [activeModalId, setActiveModalId] = useState<string>("");
    const context = useMemo(
        () => ({activeModalId, setActiveModalId}),
        [activeModalId]
    );
    return (
        <ModalZIndexContext.Provider value={context}>
            {props.children}
        </ModalZIndexContext.Provider>
    );
};
