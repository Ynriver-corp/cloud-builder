import {UpdateVersion} from "../components/versions/UpdateVersion";
import React, {useEffect, useGlobal} from "reactn";
import {useLocation, useSettings} from "../hooks";
import {firestore, version} from "../firebase";
import get from "lodash/get";
import {App} from "../App";
import {WithConfiguration} from "../session/WithConfiguration";
import {WithAuthentication} from "../session/WithAuthentication";

const CheckVersion = () => {
    const [settings, setSettings] = useGlobal("settings");
    const [location, setLocation] = useGlobal("location");
    const [, setSettingsLocalStorage] = useSettings();
    const [, setLocationLocalStorage] = useLocation();

    useEffect(() => {
        const unsubscribeVersion = fetchVersion();
        !get(location, "country_code") && fetchCountryCode();
        return () => unsubscribeVersion();
    }, []);

    let pageLoaded = false;

    const fetchVersion = () =>
        firestore
            .doc("settings/default")
            .onSnapshot(async (snapshot) => {
                if (!snapshot.exists) return;

                const newSettings = snapshot.data();

                await setSettings(newSettings);
                setSettingsLocalStorage(newSettings);

                if (version !== newSettings.version && pageLoaded) {
                    localStorage.clear();
                    document.location.reload(true);
                }

                pageLoaded = true;
            });

    const fetchCountryCode = async () => {
        try {
            const responseCountry = await fetch("https://ipapi.co/json", {
                method: "GET",
            });
            const userLocation = await responseCountry.json();
            await setLocation(userLocation);
            setLocationLocalStorage(userLocation);
        } catch (error) {
            console.error(error);
        }
    };

    return version === get(settings, "version", version)
        ? <WithAuthentication>
            <App version={version}
                 serverVersion={get(settings, "version", version)}/>
        </WithAuthentication>
        : <UpdateVersion/>
};

export default WithConfiguration(CheckVersion);
