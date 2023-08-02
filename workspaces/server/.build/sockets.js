"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocket = void 0;
const crypto = require('node:crypto');
const sockets = new Set();
const rooms = {};
const lobbyInfo = () => ({
    usersOnline: sockets.size,
    rooms,
});
const setupSocket = (socket, io) => {
    console.log('user connected', socket.id);
    sockets.add(socket.id);
    io.emit('lobby-info', lobbyInfo());
    socket.on('create-room', () => {
        console.log('message create room');
        const roomId = crypto.randomUUID();
        rooms[roomId] = {
            id: roomId,
            player1: socket.id,
            player2: undefined,
        };
        io.emit('lobby-info', lobbyInfo());
    });
    socket.on('join-room', (roomId) => {
        if (!rooms[roomId])
            return;
        rooms[roomId].player2 = socket.id;
        io.emit('lobby-info', lobbyInfo());
    });
    socket.on('disconnect', () => {
        sockets.delete(socket.id);
        console.log('user disconnected', socket.id);
        Object.entries(rooms).forEach(([roomId, room]) => {
            const { player1, player2 } = room;
            if ([player1, player2].includes(socket.id)) {
                delete rooms[roomId];
            }
        });
        io.emit('lobby-info', lobbyInfo());
    });
};
exports.setupSocket = setupSocket;
