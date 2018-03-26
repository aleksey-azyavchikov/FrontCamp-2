
import { connect } from "react-redux";

const InfoPopupPresenter = (props) => {
    if(props.id !== props.currentId) return null;
    return <div class="alert alert-danger" role="alert">
        {props.message}
    </div>
}


export const InfoPopup = connect(
    (state) => ({ currentId: state.popupState.popupId, message: state.popupState.message })
)(InfoPopupPresenter)