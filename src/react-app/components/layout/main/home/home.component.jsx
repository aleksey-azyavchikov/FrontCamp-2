import { PureComponent } from "react";

export class Home extends PureComponent {
    render() {
        return this.layout();
    }

    layout = () => (
        <div class="page">
            <div class="container-fluid">
                <div class="row"></div>
                <div class="row">
                    <div class="col-md-8">
                        <div class="jumbotron">
                            <h1 class="display-3">Welcome to FrontCamp!</h1>
                            <p class="lead">This is test application</p>
                            <hr class="my-4" />
                            <p>Powered by <a href="http://newsapi.org" role="link">News Api.</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}