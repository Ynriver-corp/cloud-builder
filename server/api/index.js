const http = require("http");
const SocketService = require("./SocketService");

const PORT = process.env.BACK_PORT ?? 8080;
console.log("PORT", PORT)

/*
  Create Server from http module.
  If you use other packages like express, use something like,
  const app = require("express")();
  const server = require("http").Server(app);
*/

const server = http.createServer((req, res) => {
    res.write("Terminal Server Running.");
    res.end();
});

server.listen(PORT, function () {
    console.log("Server listening on : ", PORT);
    const socketService = new SocketService();
    socketService.attachServer(server);
});
