import React from "react";
import { AuthenticationService } from "../../../../../core/services/authentication.service";
import "./login-form.component.scss";

export class LoginForm extends React.Component {
    render() {
        return (
            <div class="container">
                <div class="row justify-content-center cs-position-row">
                    <form class="border border-dark rounded cs-form">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            <small id="emailHelp" class="form-text text-muted">We will never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <button onClick={() => AuthenticationService.i().login()} type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>

        );
    }
}