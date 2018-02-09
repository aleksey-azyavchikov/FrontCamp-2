import { ActionType } from "./action-type";


export const newsReducer = (state = [], action) => {
    let newState = state;
    switch(action.type) {
        case ActionType.AddNews: {
            newState = [
                ...action.payload.news
            ]
        } break;
        default: break;
    }
    return newState;
}