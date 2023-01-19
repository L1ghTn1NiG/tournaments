const env = require('../env');

const initStartServer = (server) => {
    console.log('SETUP - Starting server..');

    const PORT = env.PORT;
    server.listen(PORT, (error) => {
        if (error) {
            console.log('ERROR - Unable to start server.');
        } else {
            console.log(`INFO - Server started on http://localhost:${PORT}`);
        }
    });
};

module.exports = initStartServer;
