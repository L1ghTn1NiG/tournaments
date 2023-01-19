const Sequelize = require('sequelize');

const env = require('./env');

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
    dialect: env.DB_DIALECT,
    host: env.DB_HOST,
    logging: env.DB_USE_LOGGING,
});

const connect = async () => {
    const models = require('./models');

    await sequelize.authenticate();
    await models.associate();

    //await sequelize.sync({ alter: true });
    await sequelize.sync({ forced: true });
};

module.exports = {
    sequelize,
    connect,
    Sequelize,
};
