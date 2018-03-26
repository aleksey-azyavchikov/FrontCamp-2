import { createReducer } from "redux-act";
import { EditorMode } from "../../../core/enums/editor-mode.enum";
import { createAction } from "redux-act";
import { httpCallAction } from "../http-call.action";

const defaultState = {
    isFetching: false,
    isFetched: false,
    error: null,
    articles: [],
    filter: "",
    editorMode: EditorMode.None,
    selected: null
};

export const articlesFetchStarted = createAction("Fetch articles started");
export const aticlesFetchFinished = createAction("Fetch articles finished");
export const articlesFetchRejected = createAction("Fetch articles rejected");
export const articlesFetching = (promise) => (dispatch) => httpCallAction(
    dispatch,
    promise,
    articlesFetchStarted,
    aticlesFetchFinished,
    articlesFetchRejected
);

export const setFilter = createAction("Set filter");
export const setEditorMode = createAction("Set editor mode");
export const setSelectedArticle = createAction("Set selected article");

export default createReducer({
    [articlesFetching]: (state, payload) => httpCallAction(
        payload.dispatch, 
        payload.promise, 
        articlesFetchStarted,
        aticlesFetchFinished,
        articlesFetchRejected
    ),
    [articlesFetchStarted]: (state) => ({...state, isFetching: true, isFetched: false, error: null}),
    [aticlesFetchFinished]: (state, payload) => ({...state, isFetching: false, isFetched: true, articles: payload, error: null }),
    [articlesFetchRejected]: (state, payload) => ({...state, isFetching: false, isFetched: true, error: payload }),

    [setFilter]: (state, payload) => ({...state, filter: payload}),
    [setEditorMode]: (state, payload) => ({...state, editorMode: payload}),
    [setSelectedArticle]: (state, payload) => ({...state, selected: payload})
}, defaultState)


