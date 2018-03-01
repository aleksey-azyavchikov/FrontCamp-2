
import React from "react";
import { LoginForm } from "./login-form/login-form.component";
import { withRouter } from "react-router-dom";

class LoginPresenter extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const from = this.props.location && 
            this.props.location.state && 
            this.props.location.state.from || { pathname: "/" };
        return (
            <LoginForm from={from}/>
        );
    }
}

export const Login = withRouter(LoginPresenter);