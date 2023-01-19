const initExpressModules = require('./express-modules-loader');
const initRoutes = require('./routes-loader');
const initStartServer = require('./start-server-loader');
const connect = require('../sequelize').connect;

const createInfo = require('../logger').createInfo;

const superLoader = async (server) => {
    // Makes all database stuff, loads models and associations between them
    // Also only after connect() you can export anything from /models
    // with confidence that everything will be fine
    await connect();
    createInfo({
        message: 'Database is connected successfully',
    });

    // Loads all server modules like logging, cookie parser and so on
    initExpressModules(server);
    createInfo({
        message: 'Express modules are set up successfully',
    });

    // Loads routes
    initRoutes(server);
    createInfo({
        message: 'Routes initialized successfully',
    });

    // Start server
    initStartServer(server);
    createInfo({
        message: 'Server is started up!',
    });
};

module.exports = superLoader;
