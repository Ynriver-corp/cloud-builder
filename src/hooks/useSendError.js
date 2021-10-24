import {useGlobal} from "reactn";
import get from "lodash/get";
import {config} from "../firebase";
import {useFetch} from "./useFetch";

export const useSendError = () => {
    const {Fetch} = useFetch();
    const [authUser] = useGlobal("user");

    const sendError = async (error = {}, action) => {
        try {
            let currentError = {error: Object(error).toString()};

            if (action) currentError.action = action;

            currentError.name = get(error, "name", null);
            currentError.stack = get(error, "stack", null);
            currentError.message = get(error, "message", null);
            currentError.description = get(error, "description", null);

            currentError.host = window.location.host;
            currentError.path = window.location.path;
            currentError.url = window.location.href;
            currentError.userId = get(authUser, "id", null);

            const response = await Fetch(`${config.serverUrl}/api/error-boundary`, "POST",
                currentError
            );

            if (response.error) throw Error(response.error.statusText);

            console.log("enviado correctamente");
        } catch (error) {
            console.error("error enviando el error", error);
        }
    };

    return {sendError: (error, action) => sendError(error, action)};
};
