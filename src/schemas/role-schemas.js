const Joi = require('joi');

const id = Joi.number().integer().required();

const roleObject = Joi.object({
    name: Joi.string().max(255).required(),
});

module.exports = {
    createRole: Joi.object({
        body: roleObject,
        params: Joi.object({}),
    }),

    getListOfRoles: Joi.object({
        body: Joi.object({}),
        params: Joi.object({}),
    }),

    getRoleByID: Joi.object({
        body: Joi.object({}),
        params: Joi.object({ id }),
    }),

    editRoleByID: Joi.object({
        body: roleObject,
        params: Joi.object({ id }),
    }),

    deleteRoleByID: Joi.object({
        body: Joi.object({}),
        params: Joi.object({ id }),
    }),
};
