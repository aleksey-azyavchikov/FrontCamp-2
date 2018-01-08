import { ActionType } from "./action-type";
import { PageType } from "../core/enums/page-type.enum";

export const pageReducer = (state = PageType.Home, action) => {
    let newState = state;
    switch(action.type) {
        case ActionType.SetActivePage: {
            newState = action.payload.activePage;
        } break;
        default: break;
    }
    return newState;
}