import "./index.scss";
import ReactDOM from "react-dom";
import { Layout } from "./components/layout/layout.component";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";
import configureStore from "./redux/config-store";

const store = configureStore();
const renderApp = (Component) => {
    ReactDOM.render(
        isDevelopment ?
        <AppContainer>
            <Provider store={store}>
                <Component/>
            </Provider>
        </AppContainer> :
        <Provider store={store}>
            <Component/>
        </Provider>
        ,
        document.getElementById("react-app")
    );
}

renderApp(Layout);

if(module.hot) {
    module.hot.accept("./components/layout/layout.component", (Layout) => { 
        renderApp(Layout)
    });
}