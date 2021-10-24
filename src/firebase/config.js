import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/analytics";
import configJson from "./config.json";

const hostName = window.location.hostname.replace("subdomain.", "");

const version = "0.1";

let config;

if ((hostName.includes("-dev") || hostName.includes("localhost"))) {
    config = configJson.development;
    console.log("dev");
} else {
    config = configJson.production;
    console.log("prod");
}

firebase.initializeApp(config.firebase);

const analytics = firebase.analytics();
const firestore = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

try {
    firestore.settings({ignoreUndefinedProperties: true});
} catch (error) {
    console.error("ignoreUndefinedProperties", error)
}

if (hostName === "localhost") {
    config.serverUrl = config.serverUrlLocal;
    //firestore.useEmulator("localhost", 8080);
    //auth.useEmulator("http://localhost:9099/");
}

export {
    firebase,
    firestore,
    storage,
    auth,
    config,
    analytics,
    version
};
