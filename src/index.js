import React from "reactn";
import {render} from "react-dom";
import "antd/dist/antd.css";
import CheckVersion from "./versions/CheckVersion";
import * as serviceWorker from './serviceWorker';

render(<CheckVersion/>, document.getElementById("root"));

serviceWorker.register();
