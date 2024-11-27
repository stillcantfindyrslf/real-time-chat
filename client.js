const { io } = require('socket.io-client');

const socket = io('http://localhost:4000');

socket.on('connect', () => {
    console.log('Successful connection');

    const chat_id = 1;
    socket.emit('joinChat', chat_id);

    process.stdin.on('data', (input) => {
        const message = input.toString().trim();
        const data = {
            chat_id,
            user_id: 1,
            content: message,
        };

        socket.emit('message', data);
    });
});

socket.on('chatHistory', (messages) => {
    messages.forEach((message) => {
        console.log(`[${message.created_at}] User ${message.user_id}: ${message.content}`);
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from the server');
});

socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
});