import {ClassInvariant, EvalResult} from "../../../api";

export type ClassInvariantEvalRes = ClassInvariant & Omit<EvalResult, "index">;