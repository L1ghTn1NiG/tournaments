const { cleanEnv, str, port, host, bool } = require('envalid');

const env = cleanEnv(process.env, {
    // Port of application running
    PORT: port(),

    // Private key for JWT signing
    JWTPrivateKey: str(),

    // Auth data for database
    DB_NAME: str(),
    DB_USER: str(),
    DB_PASSWORD: str(),
    DB_HOST: host(),
    DB_DIALECT: str(),
    DB_USE_LOGGING: bool(),

    // Auth data for mongo logger
    MONGO_HOST: host(),
    MONGO_PORT: port(),
    MONGO_COLLECTION: str(),
    MONGO_ACCESS_CONTROL_ENABLED: bool(),
    MONGO_USER: str(),
    MONGO_PASSWORD: str(),
});

module.exports = env;
