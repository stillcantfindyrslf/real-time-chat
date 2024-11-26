module.exports = (io) => {
    io.on('connection', () => {
        console.log('Working socket');
    });
};