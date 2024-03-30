import { io } from 'socket.io-client';

const options = {
    'force new connection': true,
    reconnectAttempts: 'Infinity',
    timeout: 10_000,
    transport: ['websocket'],
};

const socket = io('http://localhost:3001', options);

export default socket;
