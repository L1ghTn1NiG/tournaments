const UserService = require('../services/user-service');
const RoleService = require('../services/role-service');
const ResponseFormat = require('../helpers/response-format');

class UserController {
    static async create(req, res) {
        const result = await UserService.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        res.status(200).json(
            ResponseFormat.success(200, 'User is created successfully', result),
        );
    }

    static async getList(req, res) {
        const result = await UserService.getList();
        res.status(200).json(
            ResponseFormat.success(200, 'Users are got successfully', result),
        );
    }

    static async getByID(req, res) {
        const result = await UserService.getByID(req.params.id);
        res.status(200).json(
            ResponseFormat.success(200, 'User is got successfully', result),
        );
    }

    static async getMe(req, res) {
        req.params.id = req.user;
        UserController.getByID(req, res);
    }

    static async updateByID(req, res) {
        const result = await UserService.updateByID(req.params.id, {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        res.status(200).json(
            ResponseFormat.success(200, 'User is updated successfully', result),
        );
    }

    static async updateMe(req, res) {
        req.params.id = req.user;
        UserController.updateByID(req, res);
    }

    static async acceptDeletionRequest(req, res) {
        const userID = req.params.id;
        await UserService.deleteByID(userID);
        res.status(200).json(
            ResponseFormat.success(200, 'User is deleted successfully', {}),
        );
    }

    static async giveAdminRoleByID(req, res) {
        const userID = req.params.id;
        const adminRole = await RoleService.getRoleByName('admin');
        const adminRoleID = adminRole.dataValues.id;

        await RoleService.giveRoleToUser(userID, adminRoleID);

        res.status(200).json(
            ResponseFormat.success(200, 'Role is given to user', {}),
        );
    }

    static async revokeAdminRoleByID(req, res) {
        const userID = req.params.id;
        const adminRole = await RoleService.getRoleByName('admin');
        const adminRoleID = adminRole.dataValues.id;

        await RoleService.revokeRoleFromUser(userID, adminRoleID);

        res.status(200).json(
            ResponseFormat.success(200, 'Role is revoked from user', {}),
        );
    }
}

module.exports = UserController;
