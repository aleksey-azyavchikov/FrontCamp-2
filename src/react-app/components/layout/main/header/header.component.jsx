import React from "react";
import Sign from "./sections/sign/sign.component";
import { connect } from "react-redux";
import { logout } from "../../login/login.actions";
import { withRouter } from "react-router-dom";
import Brand from "./sections/brand/brand.component";
import Greeting from "./sections/greeting/greeting.component";

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

                {/* <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button class="btn btn-outline-info my-2 my-sm-0 cs-btn" type="submit">Search</button>
            </form> */}
                { this.props.isAuthorized ? <Greeting/> : null }
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