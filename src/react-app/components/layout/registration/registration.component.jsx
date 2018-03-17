import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"

import "./registration.component.scss";
import { BackLink } from "../../common/back/back.component";
class RegistrationPagePresentor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheckingCredentials: false,
            userInfo: {
                email: "",
                enterPassword: "",
                confirmPassword: ""
            }
        };
    }

    onEmailChange(event) {
        this.setState({ ...this.state, userInfo: { ...this.state.userInfo, email: event.target.value } })
    }

    onEnterPasswordChange(event) {
        this.setState({ ...this.state, userInfo: { ...this.state.userInfo, enterPassword: event.target.value } })
    }

    onConfirmPasswordChange(event) {
        this.setState({ ...this.state, userInfo: { ...this.state.userInfo, confirmPassword: event.target.value } })
    }

    onSubmit(event) {
        event.preventDefault();
        const { dispatch } = this.props;
        this.setState({ ...this.state, isCheckingCredentials: true })
        let timeout = setTimeout(() => {
            if (this.defaultUser.email === this.state.userInfo.email) {
                dispatch(saveUserInfo(this.state.userInfo));
                dispatch(login());
                this.props.history.replace(
                    this.props.location.state &&
                    this.props.location.state.from.pathname || "/"
                );
            }
            this.setState({ ...this.state, isCheckingCredentials: false })
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
                                <label for="registration-email">Email address</label>
                                <input type="email" value={this.state.userInfo.email} onChange={this.onEmailChange.bind(this)} class="form-control" id="registration" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                            <div class="form-group">
                                <label for="registration-password">Enter password</label>
                                <input type="password" value={this.state.userInfo.password} onChange={this.onEnterPasswordChange.bind(this)} class="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>
                            <div class="form-group">
                                <label for="registration-confirm-password">Confirm password</label>
                                <input type="password" value={this.state.userInfo.password} onChange={this.onConfirmPasswordChange.bind(this)} class="form-control" id="exampleInputPassword1" placeholder="Password" />
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
                <div class="row justify-content-center">
                    <div class="col-4">
                    <div class="container">
                        <div class="row justify-content-between">
                            <div class="col">
                                <BackLink />
                            </div>
                            <div class="col">
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export const RegistrationPage = withRouter(connect()(RegistrationPagePresentor));