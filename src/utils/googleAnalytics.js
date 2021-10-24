import * as ReactGA from "react-ga";
import {config} from "../firebase";

export const initializeReactGA = () => {
    ReactGA.initialize(config.analytics);
    ReactGA.pageview(window.location.pathname);
};

export const gaEvent = (category, action, label, value = null) =>
    ReactGA.event({
        category: category,
        action: action,
        label: label,
        value: +value,
    });

export const gaError = (category, action) => gaEvent(category, action, null, null);


