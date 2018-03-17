import { withRouter } from "react-router-dom";

let BackLinkPresenter = (props) => (
    <span>
        <a class="nav-link" href="/#/" onClick={() => props.history.goBack()}>{"<-"} Back</a>
    </span>
)


export const BackLink = withRouter(BackLinkPresenter)
