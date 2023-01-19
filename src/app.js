// Load environment variables from .env if file exists
// Then check all environment variables
require('dotenv').config();
require('./env');

const express = require('express');
const { createInfo, createError } = require('./logger');

const init = require('./loaders');
const dbConnect = require('./logger').connect;

(async () => {
    try {
        await dbConnect();
        createInfo({
            message: 'Logging database connected successfully',
        });
        const server = express();
        await init(server);
    } catch (err) {
        console.log('Server is dead.');
        console.log(err.name);
        console.log(err.message);
        console.log(err.stack);

        try {
            createError({}, err);
        } catch (ignoredError) {
            console.log('Logging is also dead:');
            console.log(ignoredError);
        }
    }
})();
