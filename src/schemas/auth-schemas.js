const Joi = require('joi');

const username = Joi.string().max(50);
const email = Joi.string().max(255);
const password = Joi.string().min(6).max(255).required();

module.exports = {
    register: Joi.object({
        body: Joi.object({
            username: username.required(),
            email: email.required(),
            password: password,
        }),
        params: Joi.object({}),
    }),

    login: Joi.object({
        body: Joi.object({
            username,
            email,
            password,
        }).xor('username', 'email'),
        params: Joi.object({}),
    }),

    logout: Joi.object({
        body: Joi.object({}),
        params: Joi.object({}),
    }),
};
