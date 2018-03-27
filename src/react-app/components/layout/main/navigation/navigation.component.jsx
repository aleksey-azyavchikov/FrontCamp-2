import { PureComponent } from "react";
import { Link } from "react-router-dom";

export class Navigation extends PureComponent {
    render() {
        return (
            <ul class="nav">
                <li class="nav-item">
                    <Link to='/'>Home</Link>
                </li>
                <li class="nav-item">
                    <Link to='/news'>News</Link>
                </li>
            </ul>
        );
    }
}
