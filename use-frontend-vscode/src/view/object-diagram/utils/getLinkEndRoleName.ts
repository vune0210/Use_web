import {AssocEnd} from "../../../api";
import {ViewSetting} from "../types";

export function assocEndRoleName(end: AssocEnd, viewSetting: ViewSetting) {
    let constraints = [];
    if (end.ordered) {
        constraints.push("ordered");
    }
    // if (viewSetting.showUnionConstraints && end.union) {
    //   constraints.push("union");
    // }

    // if (viewSetting.showSubsetConstaints) {
    //   constraints = [...constraints, ...end.subsets.map((s) => `subsets ${s}`)];
    // }

    // if (viewSetting.showRefinesConstaints) {
    //   constraints = [
    //     ...constraints,
    //     ...end.redefines.map((s) => `redefines ${s}`),
    //   ];
    // }

    // console.log(constraints);

    let rolename;
    if (end.isDerived) {
        rolename = "/" + end.rolename;
    } else rolename = end.rolename;

    if (constraints.length > 0) {
        rolename = rolename + " {" + constraints.join(",") + "}";
    }
    return rolename;
}
