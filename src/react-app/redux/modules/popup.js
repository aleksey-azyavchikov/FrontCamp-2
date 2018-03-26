import { createReducer } from "redux-act";
import { createAction } from "redux-act";

const defaultState = {
    popupId: null,
    message: null
};

export const show = createAction("Show popup", (popupId, message) => ({ popupId, message }));
export const hide = createAction("Hide popup");
export const deferredHide = (popupId, message, timeout) => (dispatch) => {
    dispatch(show(popupId, message))
    setTimeout(() => {
        dispatch(hide());
    }, 
    timeout);
}

export default createReducer({
    [show]: (state, payload) => ({ ...state, popupId: payload.popupId, message: payload.message }),
    [hide]: (state) => ({ ...state, popupId: null, message: null }),
}, defaultState)
