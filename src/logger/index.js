const mongoose = require('mongoose');
const env = require('../env');
const schemas = require('./schema');

let connection;

const connect = async () => {
    // Common configuration
    const host = env.MONGO_HOST;
    const port = env.MONGO_PORT;
    const collection = env.MONGO_COLLECTION;
    const accessControlEnabled = env.MONGO_ACCESS_CONTROL_ENABLED;

    // Driver options
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false,
    };

    // connect URI
    let connectURI;
    if (accessControlEnabled) {
        const user = env.MONGO_USER;
        const password = env.MONGO_PASSWORD;
        connectURI = `mongodb://${user}:${password}@${host}:${port}/${collection}`;
    } else {
        connectURI = `mongodb://${host}:${port}/${collection}`;
    }

    await mongoose.connect(connectURI, options);
    connection = mongoose.connection;
};

const createInfo = async (infoObject) => {
    try {
        let Info = connection.model('Information', schemas.infoSchema);

        let info = new Info({
            data: infoObject,
            date: new Date(),
        });

        await info.save();
    } catch (err) {
        console.log(err);
    }
};

const createLog = async (req, data = {}) => {
    try {
        let Log = connection.model('Log', schemas.logSchema);

        let log = new Log({
            url: req.originalUrl,
            method: req.method,
            body: req.body || {},
            date: new Date(),
            data: data,
        });

        await log.save();
    } catch (err) {
        console.log(err);
    }
};

const createError = async (req, err = {}) => {
    try {
        let Error = connection.model('Error', schemas.errorSchema);

        let error = new Error({
            url: req.originalUrl,
            method: req.method,
            body: req.body || {},
            date: new Date(),
            error: err,
        });

        await error.save();
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    connect,
    createLog,
    createInfo,
    createError,
};

module.exports.createInfo = createInfo;
module.exports.createLog = createLog;
module.exports.createError = createError;
