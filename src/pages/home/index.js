import React, {Fragment, useGlobal} from "reactn";
import get from "lodash/get";
import {useI18n} from "../../utils";

export const Home = () => {
    const [authUser] = useGlobal("user");
    const i18n = useI18n();

    return <Fragment>
        <h1>{i18n(["home", "welcome"])} {get(authUser, "firstName", "")} {get(authUser, "lastName", "")}</h1>
    </Fragment>;
};
