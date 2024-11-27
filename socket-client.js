const { io } = require('socket.io-client');

const socket = io('http://localhost:4000');

socket.on('connect', () => {
    console.log('Successful connection');
    console.log(`Socket ID: ${socket.id}`);
});

socket.on('disconnect', () => {
    console.log('Connection is lost');
});