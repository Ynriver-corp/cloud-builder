/*
import os from "os"
import pty from "node-pty"
import {Terminal} from "xterm";
import {FitAddon} from 'xterm-addon-fit';
import "xterm/css/xterm.css";


export const startTerminal = (terminalRef) => {
    console.log("hola",process.env)
    const container = terminalRef;

    const shell = os.platform() === "win32" ? "powershell.exe" : "bash";

    const ptyProcess = pty.spawn(shell, [], {
        name: "xterm-color",
        cwd: process.env.HOME, // Which path should terminal start
        env: process.env // Pass environment variables
    });

    const terminal = new Terminal({
        fontSize: 11,
        scrollback: 10
    });

    terminal.setOption("theme", {
        background: "#202B33",
        foreground: "#F5F8FA"
    })

    //terminal.attachTo(container);
    // Add fit.
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(container);
    fitAddon.fit();

    // Default text to display on terminal.
    terminal.write("Terminal Connected");
    terminal.write("");

    //prompt();
    terminal.write(`\r\n$ `);

    //terminal.startListening();
    terminal.onData(data => ptyProcess.write(data));

    // Add a "data" event listener.
    ptyProcess.on("data", data => {
        // Whenever terminal generates any data, send that output to socket.io client to display on UI
        //this.sendToClient(data);
        console.log(data);
        //terminal.write(data)
    });
};
 */
