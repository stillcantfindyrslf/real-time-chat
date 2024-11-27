const {saveMessage} = require('../services/messageService');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('new_message', async (data) => {
            try {
                console.log('Message received:', data);

                const savedMessage = await saveMessage({
                    chat_id: data.chat_id,
                    user_id: data.user_id,
                    content: data.content,
                });

                console.log('Message has been saved in db:', savedMessage);

                io.to(`chat_${data.chat_id}`).emit('message_saved', savedMessage);
            } catch (error) {
                console.error('Message preparation error:', error);
                socket.emit('error_saving_message', { error: 'Failed to save message' });
            }
        });

        socket.on('disconnect', () => {
            console.log(`User is disconnected: ${socket.id}`);
        });
    });
};