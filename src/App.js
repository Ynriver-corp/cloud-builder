import React, {useEffect, useGlobal} from "reactn";
import {BrowserRouter} from "react-router-dom";
import {Routes} from "./routes";
import {ScrollTop} from "./ScrollTop";
import {notification} from "antd";

export const App = () => {

    const [authUser] = useGlobal("user");
    const [, setIsVisibleLoginModal] = useGlobal("isVisibleLoginModal");

    useEffect(() => {
        initialize();
    }, []);

    useEffect(() => {
        authUser && setIsVisibleLoginModal(false);
    }, [authUser, setIsVisibleLoginModal]);

    const initialize = async () => {
        console.log("init with WebPack");
    }

    const showNotificationAnt = (message, description, type = "error") =>
        notification[type]({message, description});

    return <BrowserRouter>
        <ScrollTop>
            <Routes showNotification={showNotificationAnt}/>
        </ScrollTop>
    </BrowserRouter>;
};
