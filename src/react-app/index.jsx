import "./index.scss";
import ReactDOM from "react-dom";
import { Layout } from "./components/layout/layout.component";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { AppContainer } from "react-hot-loader";

const store = createStore(
    combineReducers({
        app: () => ({})
    })
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
