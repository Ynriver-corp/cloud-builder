import {TerminalUI} from "./TerminalUI";
import io from "socket.io-client";

// IMPORTANT: Make sure you replace this address with your server address.
const serverAddress = "http://localhost:8000";

//Server sandbox available at https://codesandbox.io/s/web-terminal-tutorial-server-g2ihu

const connectToSocket = (serverAddress) =>
    new Promise(resolve => {
        const socket = io(serverAddress);
        resolve(socket);
    })

const startTerminal = (container, socket) => {
    // Create an xterm.js instance (TerminalUI class is a wrapper with some utils. Check that file for info.)
    const terminal = new TerminalUI(socket);

    // Attach created terminal to a DOM element.
    terminal.attachTo(container);

    // When terminal attached to DOM, start listening for input, output events.
    // Check TerminalUI startListening() function for details.
    terminal.startListening();
}

export const start = async (terminalRef) => {
    //const container = document.getElementById("terminal-container");
    const container = terminalRef;
    // Connect to socket and when it is available, start terminal.
    const socket = await connectToSocket(serverAddress)
    startTerminal(container, socket);
}

// Better to start on DOMContentLoaded. So, we know terminal-container is loaded
//start();
