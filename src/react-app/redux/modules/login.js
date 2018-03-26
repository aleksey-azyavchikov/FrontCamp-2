import { createReducer } from "redux-act";
import { createAction } from "redux-act";

const defaultState = {
    isAuthorized: false,
    userInfo: {
        nickName: null,
        email: null
    },
};

export const login = createAction("Login");
export const logout = createAction("Logout");
export const saveUserInfo = createAction("Save User Info");

export default createReducer({
    [login]: (state) => state = {...state, isAuthorized: true},
    [logout]: (state) => state = {...state, isAuthorized: false},
    [saveUserInfo]: (state, payload) => state = {...state, userInfo: { ...payload } },
}, defaultState)
