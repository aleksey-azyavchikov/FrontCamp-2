import "./index.scss";
import { Layout } from "./components/layout/layout.component";
import { HashRouter } from "react-router-dom"
import { Redux } from "react-re"

class Root extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <HashRouter>
                <Layout store={createStore()}/>
            </HashRouter>
        );
    }
}

const app = document.getElementById("react-app");

ReactDOM.render(<Root />, app);