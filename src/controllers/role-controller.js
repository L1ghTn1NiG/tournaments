const RoleService = require('../services/role-service');
const ResponseFormat = require('../helpers/response-format');

class RoleController {
    static async createRole(req, res) {
        const roleObject = {
            name: req.body.name,
        };
        const role = await RoleService.createRole(roleObject);
        res.status(200).json(
            ResponseFormat.success(200, 'Role is created successfully', role),
        );
    }

    static async getListOfRoles(req, res) {
        const rolesList = await RoleService.getListOfRoles();
        res.status(200).json(
            ResponseFormat.success(
                200,
                'List of roles is got successfully',
                rolesList,
            ),
        );
    }

    static async getRoleByID(req, res) {
        const roleID = req.params.id;
        const role = await RoleService.getRoleByID(roleID);
        res.status(200).json(
            ResponseFormat.success(200, 'Role is got successfully', role),
        );
    }

    static async editRoleByID(req, res) {
        const roleID = req.params.id;
        const roleObject = {
            name: req.body.name,
        };
        const updatedRole = await RoleService.editRoleByID(roleID, roleObject);
        res.status(200).json(
            ResponseFormat.success(
                200,
                'Role is edited successfully',
                updatedRole,
            ),
        );
    }

    static async deleteRoleByID(req, res) {
        const roleID = req.params.id;
        await RoleService.deleteRoleByID(roleID);
        res.status(200).json(
            ResponseFormat.success(200, 'Role is deleted successfully', {}),
        );
    }
}

module.exports = RoleController;
