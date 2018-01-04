import "./index.scss";
import { ComponentLoader } from "./js/core/component.loader";
import { Store } from "./js/core/redux/store";
import { combineReducers } from "./js/core/redux/reducer";
import { userReducer } from "./js/reducers/user";
import App from "./js/components/app/app.component.js";

ComponentLoader.loadComponent(App, { 
    pref: document.body,
    store: Store.createStore(combineReducers({
        user: userReducer
    }))
}); 