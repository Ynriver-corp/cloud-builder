import React, {setGlobal, useEffect, useState} from "reactn";
import {setLocale} from "yup";
import {yup} from "../config";
import {config, version} from "../firebase";
import {darkTheme, GlobalStyle, lightTheme} from "../theme";
import {collectionToDate, useEnvironment, useLanguageCode, useLocation, useSettings, useUser} from "../hooks";
import get from "lodash/get";
import {ThemeProvider} from "styled-components";
import moment from "moment";
import "moment/locale/es";
import {initializeManifest} from "../utils/manifest";
import {spinLoader} from "../components/common/loader";
import {initializeReactGA} from "../utils/googleAnalytics";
import {ErrorFallback} from "../components/error-fallback/ErrorFallback";
import {ErrorBoundary} from "react-error-boundary";

export const WithConfiguration = Component => () => {
    const [isLoadingConfig, setIsLoadingConfig] = useState(true);
    const [authUserLS] = useUser();
    const [settingsLS] = useSettings();
    const [environment, setEnvironment] = useEnvironment();
    const [location] = useLocation();
    const [languageCode] = useLanguageCode();

    useEffect(() => {
        const initializeConfig = async () => {
            environment !== config.firebase.projectId && localStorage.clear();
            setEnvironment(config.firebase.projectId);

            await setGlobal({
                user: authUserLS ? collectionToDate(authUserLS) : null,
                settings: collectionToDate({...settingsLS, version}),
                location,
                languageCode,
                currentRoute: {},
                currentTemplate: {},
                register: null,
                isLoadingUser: true,
                isLoadingCreateUser: true,
                isVisibleLoginModal: false,
                isVisibleForgotPassword: false,
                openRightDrawer: false,
                openLeftDrawer: false,
                serverTime: new Date(),
                currentCurrency: "s/.",
                theme: get(authUserLS, "theme") === "lightTheme" ? lightTheme : darkTheme,
            });

            moment.locale(languageCode);
            setLocale(yup[languageCode]);
        };

        initializeConfig();
        initializeReactGA();
        initializeManifest();
        setIsLoadingConfig(false);
    }, []);

    return <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ThemeProvider theme={get(authUserLS, "theme") === "lightTheme" ? lightTheme : darkTheme}>
            <GlobalStyle/>
            {
                isLoadingConfig
                    ? spinLoader()
                    : <Component/>
            }
        </ThemeProvider>
    </ErrorBoundary>
};
