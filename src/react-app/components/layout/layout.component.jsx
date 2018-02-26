
import { Route, Switch } from "react-router-dom";
import { Login } from "./login/login.component";
import { Main } from "./main/main.component";

export const Layout = () => (
    <div>
        <Switch>
            <Route path="/" component={Main} />
            <Route exact path="/login" component={Login} />
        </Switch>
    </div>
);      