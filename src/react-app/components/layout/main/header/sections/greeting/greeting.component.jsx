

import { connect } from "react-redux"
import "./greeting.component.scss";

const Greeting = (props) => (
    <span class="navbar-text greeting-position">
        Hello, {props.nickName}
    </span>
)

export default connect((state) => ({ nickName: state.loginState.userInfo.nickName }))(Greeting)

