import React from "react";
import "./login-form.component.scss";
import { login, saveUserInfo } from "../login.actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"


const LoginFormPresentor = class extends React.Component {
    constructor(props) {
        super(props);
        this.defaultUser = { email: "a@a.com", password: "A" };
        this.state = {
            isCheckingCredentials: false,
            userInfo: {
                email: "",
                password: ""
            }
        };
    }

    onEmailChange(event) {
        this.setState({ ...this.state, userInfo: { ...this.state.userInfo, email: event.target.value } })
    }

    onPasswordChange(event) {
        this.setState({ ...this.state, userInfo: { ...this.state.userInfo, password: event.target.value } })
    }

    onSubmit(event) {
        event.preventDefault();
        const { dispatch } = this.props;
        this.setState({ ...this.setState, isCheckingCredentials: true })
        let timeout = setTimeout(() => {
            if (this.defaultUser.email === this.state.userInfo.email) {
                dispatch(saveUserInfo(this.state.userInfo));
                dispatch(login());
                this.props.history.replace(
                    this.props.location.state &&
                    this.props.location.state.from.pathname || "/"
                );
            }
            this.setState({ ...this.setState, isCheckingCredentials: false })
            clearTimeout(timeout);
        }, 3000)
    }

    render() {
        return (
            <div class="container">
                <div class="row justify-content-center cs-position-row">
                    <div class="col-4">
                        <form onSubmit={this.onSubmit.bind(this)} class="border border-dark rounded cs-form">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address {this.state.userInfo.email}</label>
                                <input type="email" value={this.state.userInfo.email} onChange={this.onEmailChange.bind(this)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                <small id="emailHelp" class="form-text text-muted">We will never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password {this.state.userInfo.password}</label>
                                <input type="password" value={this.state.userInfo.password} onChange={this.onPasswordChange.bind(this)} class="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>
                            <input type="submit" class="btn btn-primary" value="Submit" />
                        </form>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-4">
                        <span>{this.state.isCheckingCredentials ? "Loading..." : null}</span>
                    </div>
                </div>
                <div class="row justify-content-around">
                    <div class="col-3">
                    </div>
                    <div class="col-4">
                        <a href="#/registration">Registration</a>
                    </div>
                </div>
            </div>
        );
    }
}

export const LoginForm = withRouter(connect()(LoginFormPresentor));