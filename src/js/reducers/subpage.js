import { ActionType } from "./action-type";
import { SubPageType } from "../core/enums/subpage-type.enum";

export const subpageReducer = (state = SubPageType.None, action) => {
    let newState = state;
    switch(action.type) {
        case ActionType.SetActiveSubPage: {
            newState = action.payload;
        } break;
        default: break;
    }
    return newState;
}