import { Home } from "../home/home.component";
import { News } from "../news/news.component";
import { Switch, Route } from "react-router-dom";
import React from "react";

export class PageLoader extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/news" component={News} />
            </Switch>
        );
    }
}