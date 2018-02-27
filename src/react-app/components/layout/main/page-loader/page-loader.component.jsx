import { Home } from "../home/home.component";
import { News } from "../news/news.component";
import { Switch, Route } from "react-router-dom";
import React from "react";
import { ProtectedRoute } from "../../protected-route/protected-route";

export class PageLoader extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <ProtectedRoute path="/news" component={News} />
            </Switch>
        );
    }
}