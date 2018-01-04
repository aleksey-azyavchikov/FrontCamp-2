import { ActionType } from "./action-type";

export const userReducer = (state = {}, action) => {
    let newState = state;
    switch(action.type) {
        case ActionType.AddUserInfo: {
            newState = {
                name: action.payload.name,
                apiKey: action.payload.apiKey
            }
        } break;
        default: break;
    }
    return newState;
}