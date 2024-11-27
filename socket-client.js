const { io } = require('socket.io-client');

const socket = io('http://localhost:4000');

socket.on('connect', () => {
    console.log('Successful connection');

    socket.emit('new_message', {
        chat_id: 1,
        user_id: 1,
        content: 'Hello my friend',
    });
});

socket.on('message_saved', (data) => {
    console.log('Message has been saved:', data);
});

socket.on('error_saving_message', (data) => {
    console.error('Failed to save message:', data);
});