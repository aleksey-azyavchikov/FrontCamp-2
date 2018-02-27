import "./index.scss";
import ReactDOM from "react-dom";
import { Layout } from "./components/layout/layout.component";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { AppContainer } from "react-hot-loader";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { loginStateReducer } from "./components/layout/login/login.reducer";

const store = createStore(
    combineReducers({
        loginState: loginStateReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, logger)
);

const renderApp = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component/>
            </Provider>
        </AppContainer>,
        document.getElementById("react-app")
    );
}

renderApp(Layout);

if(module.hot) {
    module.hot.accept("./components/layout/layout.component", (Layout) => { 
        renderApp(Layout)
    });
}
