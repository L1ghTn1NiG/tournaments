const Schema = require('mongoose').Schema;

const infoSchema = new Schema(
    {
        date: Date,
        data: Object,
    },
    {
        versionKey: false,
    },
);

const logSchema = new Schema(
    {
        method: String,
        url: String,
        body: Object,
        data: Object,
        date: Date,
    },
    {
        versionKey: false,
    },
);

const errorSchema = new Schema(
    {
        method: String,
        url: String,
        body: Object,
        error: Object,
        date: Date,
    },
    {
        versionKey: false,
    },
);

module.exports = {
    infoSchema,
    logSchema,
    errorSchema,
};
