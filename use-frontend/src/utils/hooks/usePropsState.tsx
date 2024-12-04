import {useCallback, useState} from "react";
import {isCallback} from "../is";

interface Props<T = any> {
    initialState: T;
    state?: T;
    setState?: (v: T) => any;
}

const doNothing = () => null;

export function usePropsState<T>(
    props: Props<T>
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = useState(props.initialState);

    const setBothState = useCallback<React.Dispatch<React.SetStateAction<T>>>(
        (v) => {
            // internal state prefered
            if (isCallback<(prevState: T) => T>(v)) {
                let nextState: T | null = null;
                setState((preState) => (nextState = v(preState)));
                if (nextState) props.setState?.(nextState);
            } else {
                setState(v);
                props.setState?.(v);
            }
        },
        [props.setState]
    );

    const setPropsState = useCallback<React.Dispatch<React.SetStateAction<T>>>(
        (v) => {
            // props state prefered
            if (isCallback<(prevState: T) => T>(v)) {
                if (props.state == null) {
                    console.warn("[usePropsState] props.state = null");
                    return;
                }
                props.setState?.(v(props.state));
            } else {
                props.setState?.(v);
            }
        },
        [props.state, props.setState]
    );

    if (props.state != null && props.setState != null) {
        // use prop state
        return [props.state, setPropsState];
    }

    if (props.state == null) {
        // use internal state
        return [state, setBothState];
    }

    // use prop state, disable setState
    return [props.initialState, doNothing];
}
