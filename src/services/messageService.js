const { Message } = require('../../models');

/**
 * Сохраняет сообщение в базе данных.
 * @param {Object} messageData - Данные сообщения.
 * @param {number} messageData.chat_id - ID чата.
 * @param {number} messageData.user_id - ID пользователя.
 * @param {string} messageData.content - Текст сообщения.
 * @returns {Promise<Object>} Сохраненное сообщение.
 */
const saveMessage = async (messageData) => {
    try {
        const savedMessage = await Message.create(messageData);
        return savedMessage;
    } catch (error) {
        console.error('Error writing:', error);
    }
};

module.exports = { saveMessage };