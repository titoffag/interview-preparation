import path from 'path';
import express from 'express';
import {version, validate} from 'uuid';
import socket from './src/socket';

const app = express();
const server = import('http').then(({ default: http }) => http.createServer(app));

const io = import('socket.io').then(({ default: io }) => io.listen(server));

const PORT = process.env.PORT || 3001;

function getClientRooms() {
    const {rooms} = io.socket.adapter;
    return Array.from(rooms.keys()).filter(
        roomId => validate(roomId) && version(roomId) === 4
    );
}

function shareRoomsInfo() {
    io.emit(ACTIONS.SHARE_ROOMS, {
        rooms: getClientRooms(),
    });
}

io.on('connection', socket => {
    shareRoomsInfo();

    socket.on(ACTIONS.JOIN, config => {
        const {room: roomId} = config;
        const {rooms: joinedRooms} = socket;

        if (Array.from(joinedRooms).includes(roomId)) {
            return console.warn(`Already joined to ${roomId}`);
        }

        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

        clients.forEach(clientId => {
            io.to(clientId).emit(ACTIONS.ADD_PEER, {
                peerId: socket.id,
                createOffer: false,
            });

            socket.emit(ACTIONS.ADD_PEER, {
                peerId: clientId,
                createOffer: true,
            });
        });

        socket.join(roomId);
        shareRoomsInfo();
    });

    function leaveRoom() {
        const {rooms: joinedRooms} = socket;

        Array.from(joinedRooms)
        .filter(roomId => {
            return validate(roomId) && version(roomId) === 4;
        })
        .forEach(roomId => {
            const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

            clients.forEach(clientId => {
                io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
                    peerId: socket.id,
                });

                socket.emit(ACTIONS.REMOVE_PEER, {
                    peerId: clientId,
                });
            });

            socket.leave(roomId);
        });

        shareRoomsInfo();
    }

    socket.on(ACTIONS.LEAVE, leaveRoom);
    socket.on('disconnecting', leaveRoom);
});

server.listen(
    PORT,
    () => console.log(`Server is listening on port ${PORT}`),
);
