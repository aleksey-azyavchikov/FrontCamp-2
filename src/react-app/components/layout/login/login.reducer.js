import * as actions from "./login.actions";
import { createReducer } from "redux-act";

const defaultState = {
    isAuthorized: false,
    userInfo: {
        email: null,
        password: null
    },
};

export const loginStateReducer = createReducer({
    [actions.login]: (state) => state = {...state, isAuthorized: true},
    [actions.logout]: (state) => state = {...state, isAuthorized: false},
    [actions.saveUserInfo]: (state, payload) => state = {...state, userInfo: { ...payload } },
}, defaultState)
