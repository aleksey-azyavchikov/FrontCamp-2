import { Header } from "../header/header.component";
import { PageLoader } from "../page-loader/page-loader.component";
import { Login } from "../login/login.component";
import { Router } from "react-router-dom";

export class Layout extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Header/>
                <PageLoader/>
                <Router path="/login" component={Login} />
            </div>
        );
    }
}