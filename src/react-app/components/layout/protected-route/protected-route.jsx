
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

let ProtectedRouteInner = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={props => rest.isAuthorized
        ?  (<Component {...props}/>)
        :  <Redirect to={{ pathname: "/login", state: { from: props.location }}} />
    }>
    </Route>
};

export const ProtectedRoute = connect((state) => ({ isAuthorized: state.loginState.isAuthorized }), null)(ProtectedRouteInner);