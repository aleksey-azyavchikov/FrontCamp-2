
import { Route, Switch } from "react-router-dom";
import { Login } from "./login/login.component";
import { Main } from "./main/main.component";
import { HashRouter as Router } from "react-router-dom";

export const Layout = () => (
    <Router>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Main}/>
        </Switch>
    </Router>
);      