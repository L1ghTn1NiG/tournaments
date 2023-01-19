const RoleService = require('../services/role-service');
const { ForbiddenException } = require('../classes/errors/4xx/');

const isAdmin = async (req, res, next) => {
    const userID = req.user;
    const adminRole = await RoleService.getRoleByName('admin');
    const adminRoleID = adminRole.dataValues.id;

    const isAdmin = await RoleService.isRoleGivenToUser(userID, adminRoleID);

    if (isAdmin) {
        next();
    } else {
        throw new ForbiddenException('Not admin');
    }
};

module.exports = isAdmin;
