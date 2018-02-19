import "./index.scss";
import { Layout } from "./components/layout/layout.component";
import { HashRouter } from "react-router-dom"
import { Redux, Provider } from "react-redux";
import { PropTypes } from "prop-types";
import { createStore, combineReducers } from "redux";

let store = createStore(combineReducers({

}));

class Root extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <HashRouter>
                <Provider store={store}>
                    <Layout/>
                </Provider>
            </HashRouter>
        );
    }
}

const app = document.getElementById("react-app");

ReactDOM.render(<Root />, app);