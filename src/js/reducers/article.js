import { ActionType } from "./action-type";

export const articleReducer = (state = null, action) => {
    let newState = state;
    switch(action.type) {
        case ActionType.SelectArticle: {
            newState = action.payload;
        } break;
        case ActionType.UnselectArticle: {
            newState = null;
        } break;
        default: break;
    }
    return newState;
}