const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const { sequelize } = require('./models');

const server = http.createServer(app);
const io = new Server(server);

require('./src/sockets')(io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
        console.log(`Server running on http://localhost:${PORT}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});