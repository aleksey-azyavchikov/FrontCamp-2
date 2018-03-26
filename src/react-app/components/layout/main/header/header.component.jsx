import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Brand from "./sections/brand/brand.component";
import Greeting from "./sections/greeting/greeting.component";
import Sign from "./sections/sign/sign.component";
import { logout } from "../../../../redux/modules/login";

class HeaderPresenter extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return this.layout();
    }

    isActive = (value) => {
        let result = value === this.props.history.location.pathname
            ? "nav-item active"
            : "nav-item";
        return result;
    }

    layout = () => (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark cs-bar">
            <Brand />
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class={this.isActive("/")}>
                        <a class="nav-link" href="#/">Home</a>
                    </li>
                    <li class={this.isActive("/news")}>
                        <a class={`nav-link ${this.props.isAuthorized ? "" : "disabled"}`} href="#/news">News</a>
                    </li>
                </ul>

                { 
                    this.props.isAuthorized ? <Greeting/> : null 
                }
                {
                    this.props.isAuthorized
                        ? <Sign title="Sign Off" onClick={this.props.onLogoutClick} />
                        : <Sign title="Sign On" onClick={() => this.props.history.replace("/login")} />
                }
            </div>
        </nav>
    );
}



export const Header = withRouter(connect(
    (state) => ({
        isAuthorized: state.loginState.isAuthorized
    }),
    (dispatch) => ({
        onLogoutClick: () => { dispatch(logout()) }
    })
)(HeaderPresenter))