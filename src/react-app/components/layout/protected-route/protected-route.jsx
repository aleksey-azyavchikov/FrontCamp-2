
import { Route, Redirect } from "react-router-dom";
import { AuthenticationService } from "../../../../core/services/authentication.service";

export const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={ props => AuthenticationService.i().isLogin 
        ?  (<Component {...props}/>)
        :  (<Redirect to={{ pathname: "/login", state: { from: props.location }}} />)
    }>
    </Route>
);