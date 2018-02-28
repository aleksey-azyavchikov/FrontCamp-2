
import React from "react";
import { LoginForm } from "./login-form/login-form.component";
import { withRouter } from "react-router-dom";

class LoginPresenter extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        console.log("re", this.props);
        const { from = this.props.history.location } = this.props.location.state;
        return (
            <LoginForm from={from}/>
        );
    }
}

export const Login = withRouter(LoginPresenter);