import "./index.scss";
import ReactDOM from "react-dom";
import { Layout } from "./components/layout/layout.component";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { AppContainer } from "react-hot-loader";

const store = createStore(
    combineReducers({
        app: () => ({})
    })
);

const app = document.getElementById("react-app");

const renderApp = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Router>
                    <Layout/>
                </Router>
            </Provider>
        </AppContainer>,
        app
    );
}

renderApp();

if(module.hot) {
    module.hot.accept("./components/layout/layout.component", renderApp);
}
