import "./sign.component.scss";

const Sign = (props) => (
    <form class="form-inline">
        <button onClick={props.onClick} type="button" class="btn btn-outline-info my-2 cs-btn" data-toggle="modal" data-target="#signInModal">
            {props.title}
        </button>
    </form>
);

export default Sign;