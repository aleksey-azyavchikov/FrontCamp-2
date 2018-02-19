import { Home } from "../home/home.component";
import { News } from "../news/news.component";
import { Switch, Route } from "react-router-dom";

export class PageLoader extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/news" component={News} />
            </Switch>
        );
    }
}