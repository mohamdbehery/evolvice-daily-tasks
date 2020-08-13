import { Route, Redirect } from "react-router";
import React from "react";
import { Helper } from "../helpers/helper";

function PrivateRoute({ ...props }) {

    let helper = new Helper();
    let isAuthenticated = helper.getLoggedInUser() ? true : false;
    return (
        <Route
            path={props.path}
            render={({ location }) => {
                return isAuthenticated ? (props.children) : (<Redirect to={{ pathname: "/login", state: { from: location } }} />);
            }
            }
        />
    );
}

export default PrivateRoute;