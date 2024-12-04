import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hook";
import {loadStateEvoThunk} from "../../store/utility-view/loadUtiltyViewThunk.ts";

export const StateEvo = () => {
    const objectCount = useAppSelector((state) => state.stateEvo.objectCount);
    const linkCount = useAppSelector((state) => state.stateEvo.linkCount);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loadStateEvoThunk());
    }, []);

    return (
        <div>
            <div>Object count: {objectCount}</div>
            <div>Link count: {linkCount}</div>
        </div>
    );
};
