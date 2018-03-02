import * as actions from "./archive.actions";
import { createReducer } from "redux-act";

const defaultState = {
    isFetching: false,
    isFetched: false,
    error: null,
    articles: []
};

export const archiveStateReducer = createReducer({
    [actions.articlesFetchStarted]: (state) => state = {...state, isFetching: true, isFetched: false, error: null},
    [actions.aticlesFetchFinished]: (state, payload) => state = {...state, isFetching: false, isFetched: true, articles: payload, error: null },
    [actions.articlesFetchRejected]: (state, payload) => state = {...state, isFetching: false, isFetched: true, error: payload },
}, defaultState)
