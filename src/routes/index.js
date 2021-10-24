import React, {useGlobal} from "reactn";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import {PrivateRoute} from "./PrivateRoute";
import {PrivateAdminRoute} from "./PrivateAdminRoute";
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

const AdminUsers = loadable(() =>
    import(
        /* webpackChunkName: "users-list" */
        /* webpackPrefetch: true */
        "../pages/admin/users"), {
    fallback: spinLoader(),
});

const AdminUserAcls = loadable(() =>
    import(
        /* webpackChunkName: "users-acls" */
        /* webpackPrefetch: true */
        "../pages/admin/users/_userId/acls"), {
    fallback: spinLoader(),
});

const Hosts = loadable(() =>
    import(
        /* webpackChunkName: "hosts-list" */
        /* webpackPrefetch: true */
        "../pages/admin/hosts"), {
    fallback: spinLoader(),
});

const Host = loadable(() =>
    import(
        /* webpackChunkName: "host" */
        /* webpackPrefetch: true */
        "../pages/admin/hosts/_hostId"), {
    fallback: spinLoader(),
});

const Routes_ = loadable(() =>
    import(
        /* webpackChunkName: "routes-list" */
        /* webpackPrefetch: true */
        "../pages/admin/hosts/_hostId/routes"), {
    fallback: spinLoader(),
});

const Route_ = loadable(() =>
    import(
        /* webpackChunkName: "route" */
        /* webpackPrefetch: true */
        "../pages/admin/hosts/_hostId/routes/_routeId"), {
    fallback: spinLoader(),
});

const Seo = loadable(() =>
    import(
        /* webpackChunkName: "seo" */
        /* webpackPrefetch: true */
        "../pages/admin/hosts/_hostId/routes/_routeId/seo"), {
    fallback: spinLoader(),
});

const Manifest = loadable(() =>
    import(
        /* webpackChunkName: "manifest" */
        /* webpackPrefetch: true */
        "../pages/admin/hosts/_hostId/manifest"), {
    fallback: spinLoader(),
});

const Templates = loadable(() =>
    import(
        /* webpackChunkName: "templates" */
        /* webpackPrefetch: true */
        "../pages/admin/hosts/_hostId/templates"), {
    fallback: spinLoader(),
});

const Template = loadable(() =>
    import(
        /* webpackChunkName: "template" */
        /* webpackPrefetch: true */
        "../pages/admin/hosts/_hostId/templates/_templateId"), {
    fallback: spinLoader(),
});

const AdminContainer = loadable(() =>
    import(
        /* webpackChunkName: "admin-container" */
        /* webpackPrefetch: true */
        "../pages/admin"), {
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
        <Route exact
               path="/admin"
               render={(props_) =>
                   <UserLayout {...props} {...props_}>
                       <AdminContainer {...props} {...props_}/>
                   </UserLayout>
               }
        />
        <PrivateAdminRoute exact
                           path="/admin/users">
            <UserLayout {...props}>
                <AdminUsers {...props}/>
            </UserLayout>
        </PrivateAdminRoute>
        <PrivateAdminRoute exact
                           path="/admin/users/:userId/acls">
            <UserLayout {...props}>
                <AdminUserAcls {...props}/>
            </UserLayout>
        </PrivateAdminRoute>

        <PrivateAdminRoute exact
                           path="/admin/hosts">
            <UserLayout {...props}>
                <Hosts {...props}/>
            </UserLayout>
        </PrivateAdminRoute>
        <PrivateAdminRoute exact
                           path="/admin/hosts/:hostId">
            <UserLayout {...props}>
                <Host {...props}/>
            </UserLayout>
        </PrivateAdminRoute>
        <PrivateAdminRoute exact
                           path="/admin/hosts/:hostId/routes">
            <UserLayout {...props}>
                <Routes_ {...props}/>
            </UserLayout>
        </PrivateAdminRoute>
        <PrivateAdminRoute exact
                           path="/admin/hosts/:hostId/routes/:routeId">
            <UserLayout {...props}>
                <Route_ {...props}/>
            </UserLayout>
        </PrivateAdminRoute>
        <PrivateAdminRoute exact
                           path="/admin/hosts/:hostId/routes/:routeId/seo">
            <UserLayout {...props}>
                <Seo {...props}/>
            </UserLayout>
        </PrivateAdminRoute>

        <PrivateAdminRoute exact
                           path="/admin/hosts/:hostId/manifests">
            <UserLayout {...props}>
                <Manifest {...props}/>
            </UserLayout>
        </PrivateAdminRoute>
        <PrivateAdminRoute exact
                           path="/admin/hosts/:hostId/templates">
            <UserLayout {...props}>
                <Templates {...props}/>
            </UserLayout>
        </PrivateAdminRoute>
        <PrivateAdminRoute exact
                           path="/admin/hosts/:hostId/templates/:templateId">
            <UserLayout {...props}>
                <Template {...props}/>
            </UserLayout>
        </PrivateAdminRoute>
        <Redirect to="/"/>
    </Switch>;
};
