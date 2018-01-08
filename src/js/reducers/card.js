import { ActionType } from "./action-type";

export const cardReducer = (state = [], action) => {
    let newState = state;
    switch(action.type) {
        case ActionType.AddCard: {
            newState = [
                ...state,
                action.payload
            ]
        } break;
        default: break;
    }
    return newState;
}