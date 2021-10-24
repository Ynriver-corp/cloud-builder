import {config} from "../firebase";

export const initializeManifest = () =>
    document
        .querySelector("#manifest-placeholder")
        .setAttribute("href", `${config.serverUrl}/api/manifest`);
