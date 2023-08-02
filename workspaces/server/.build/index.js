"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require('node:http');
const socket_io_1 = require("socket.io");
const sockets_1 = require("./sockets");
const server = http.createServer((req, res) => {
    res.end('cool');
});
const { PORT = 3000 } = process.env;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    },
});
server.listen(PORT, () => console.log('server listening on port:', PORT));
io.on('connection', socket => (0, sockets_1.setupSocket)(socket, io));
