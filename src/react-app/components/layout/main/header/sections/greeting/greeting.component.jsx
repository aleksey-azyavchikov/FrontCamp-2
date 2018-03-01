

import { connect } from "react-redux"
import "./greeting.component.scss";

const Greeting = (props) => (
    <span class="navbar-text greeting-position">
        {props.email}
    </span>
)

export default connect((state) => ({ email: state.loginState.userInfo.email }))(Greeting)

