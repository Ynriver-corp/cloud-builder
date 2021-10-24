import React from "reactn";
import endsWith from "lodash/endsWith";
import map from "lodash/map";
import replace from "lodash/replace";
import {useAcl} from "../hooks";
import {Redirect, Route} from "react-router-dom";

export const PrivateAdminRoute = props => {
    const {aclRoutes} = useAcl();

    const {params, path} = props.computedMatch;

    const _path = () => {
        const paramNew = _params().find((_param) => _param.value === "new");

        if (paramNew) return replace(path, paramNew.name, "new");

        return path;
    };

    const _params = () =>
        map(params, (param, key) => ({
            id: key,
            name: `:${key}`,
            value: param,
        }));

    const isValidUser = () =>
        aclRoutes
            .some(userAcl => endsWith(_path(), userAcl))

    return <Route exact
                  path={props.path}
                  render={() =>
                      isValidUser() ? props.children : <Redirect to="/"/>
                  }/>;
};
