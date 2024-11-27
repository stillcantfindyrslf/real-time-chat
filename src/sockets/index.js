const {saveMessage, getMessageHistory} = require('../services/messageService');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(`A user connected: ${socket.id}`);

        socket.on('joinChat', async (chat_id) => {
            console.log(`User joined chat: ${chat_id}`);

            try {
                const messages = await getMessageHistory(chat_id);
                socket.emit('chatHistory', messages);
            } catch (error) {
                console.error('Error fetching chat history:', error);
            }
        });

        socket.on('message', async (data) => {
            console.log('Message received:', data);

            try {
                const savedMessage = await saveMessage(data);
                console.log('Message saved:', savedMessage);
            } catch (error) {
                console.error('Error writing:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log(`A user disconnected: ${socket.id}`);
        });
    });
};