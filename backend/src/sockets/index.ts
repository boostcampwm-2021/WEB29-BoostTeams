import { Socket } from 'socket.io';

const io = require('socket.io');
const socketIO = io();

socketIO.on('connect', (socket: Socket) => {
	console.log('socket connect');
});

export default socketIO;
