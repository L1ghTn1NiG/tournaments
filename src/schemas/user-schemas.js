const Joi = require('joi');

const id = Joi.number().integer().required();

const userObject = Joi.object({
    username: Joi.string().max(50),
    email: Joi.string().max(255),
    password: Joi.string().min(6).max(255),
});

module.exports = {
    getList: Joi.object({
        body: Joi.object({}),
        params: Joi.object({}),
    }),

    create: Joi.object({
        body: userObject,
        params: Joi.object({}),
    }),

    getMe: Joi.object({
        body: Joi.object({}),
        params: Joi.object({}),
    }),

    updateMe: Joi.object({
        body: userObject,
        params: Joi.object({}),
    }),

    getByID: Joi.object({
        body: Joi.object({}),
        params: Joi.object({ id }),
    }),

    updateByID: Joi.object({
        body: userObject,
        params: Joi.object({ id }),
    }),

    sendDeletionRequest: Joi.object({
        body: Joi.object({}),
        params: Joi.object({}),
    }),

    acceptDeletionRequest: Joi.object({
        body: Joi.object({}),
        params: Joi.object({ id }),
    }),

    giveAdminRoleByID: Joi.object({
        body: Joi.object({}),
        params: Joi.object({ id }),
    }),

    revokeAdminRoleByID: Joi.object({
        body: Joi.object({}),
        params: Joi.object({ id }),
    }),
};
