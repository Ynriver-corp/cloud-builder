import React, {useGlobal} from "reactn";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import {PrivateRoute} from "./PrivateRoute";
import {EditProfile, Home, Lading, Register, UserProfile} from "../pages";
import {UserLayout} from "../components";
import loadable from "@loadable/component"
import {spinLoader} from "../components/common/loader";

const Components = loadable(() =>
    import(
        /* webpackChunkName: "component" */
        /* webpackPreload: true */
        "../pages/components"), {
    fallback: spinLoader(),
});

export const Routes = props => {
    const [authUser,] = useGlobal("user");
    const history = useHistory();

    return <Switch>
        <Route exact
               path="/"
               render={(props_) =>
                   <UserLayout {...props} {...props_}>
                       <Lading {...props} {...props_}/>
                   </UserLayout>
               }
        />
        <Route exact
               path="/register"
               render={(props_) =>
                   <UserLayout {...props} {...props_}>
                       <Register {...props} {...props_}/>
                   </UserLayout>
               }
        />
        <PrivateRoute exact
                      path="/home">
            <UserLayout {...props}>
                <Home {...props}/>
            </UserLayout>
        </PrivateRoute>
        <Route exact
               path="/users"
               render={() =>
                   authUser
                       ? history.push(`/users/${authUser.id}`)
                       : history.push(`/`)
               }
        />
        <PrivateRoute exact
                      path="/users/:userId">
            <UserLayout {...props}>
                <UserProfile {...props}/>
            </UserLayout>
        </PrivateRoute>
        <PrivateRoute exact
                      path="/users/:userId/edit">
            <UserLayout {...props}>
                <EditProfile {...props}/>
            </UserLayout>
        </PrivateRoute>
        <PrivateRoute exact
                      path="/components">
            <UserLayout {...props}>
                <Components {...props}/>
            </UserLayout>
        </PrivateRoute>
        <Redirect to="/"/>
    </Switch>;
};
