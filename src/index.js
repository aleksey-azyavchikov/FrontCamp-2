import "./index.scss";
import { ComponentLoader } from "./js/core/component.loader";
import { Store } from "./js/core/redux/store";
import { combineReducers } from "./js/core/redux/reducer";

import App from "./js/components/app/app.component.js";

import { userReducer } from "./js/reducers/user";
import { cardReducer } from "./js/reducers/card";
import { pageReducer } from "./js/reducers/page";
import { newsReducer } from "./js/reducers/news";
import { subpageReducer } from "./js/reducers/subpage";
import { articleReducer } from "./js/reducers/article";
import { editorReducer } from "./js/reducers/editor";

ComponentLoader.getInstance().loadComponent(App, { 
    pref: document.body,
    store: Store.createStore(combineReducers({
        user: userReducer,
        cards: cardReducer,
        activePage: pageReducer,
        news: newsReducer,
        activeSubPage: subpageReducer,
        selectedArticle: articleReducer,
        editorModes: editorReducer
    }))
}); 