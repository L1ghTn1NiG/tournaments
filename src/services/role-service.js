const RoleRepository = require('../repositories/role-repository');
const {
    NotFoundException,
    ConflictException,
} = require('../classes/errors/4xx');

class RoleService {
    static async createRole(roleObject) {
        const roleWithSameName = await RoleRepository.getRoleByName(
            roleObject.name,
        );
        if (roleWithSameName) {
            throw new ConflictException('Role with this name already exists');
        }
        return RoleRepository.createRole(roleObject);
    }

    static async getListOfRoles() {
        return RoleRepository.getListOfRoles();
    }

    static async getRoleByID(roleID) {
        const role = await RoleRepository.getRoleByID(roleID);
        if (!role) {
            throw new NotFoundException('Role is not found');
        }
        return role;
    }

    static async getRoleByName(roleName) {
        const role = await RoleRepository.getRoleByName(roleName);
        if (!role) {
            throw new NotFoundException('Role is not found');
        }
        return role;
    }

    static async editRoleByID(roleID, roleObject) {
        const role = await RoleRepository.getRoleByID(roleID);
        const roleWithSameName = await RoleRepository.getRoleByName(
            roleObject.name,
        );

        if (roleWithSameName) {
            throw new ConflictException('Role with this name already exists');
        }
        if (role.dataValues.name === 'admin') {
            throw new ConflictException(
                'You really should NOT rename admin role',
            );
        }
        if (!role) {
            throw new NotFoundException('Role is not found');
        }

        return RoleRepository.editRoleByID(roleID, roleObject);
    }

    static async deleteRoleByID(roleID) {
        const role = await RoleRepository.getRoleByID(roleID);
        if (role.dataValues.name === 'admin') {
            throw new ConflictException(
                'You really should NOT delete admin role',
            );
        }
        if (!role) {
            throw new NotFoundException('Role is not found');
        }
        await RoleRepository.deleteRoleByID(roleID);
    }

    static async isRoleGivenToUser(userID, roleID) {
        return await RoleRepository.isRoleGivenToUser(userID, roleID);
    }

    static async giveRoleToUser(userID, roleID) {
        const roleIsGiven = await RoleService.isRoleGivenToUser(userID, roleID);
        if (roleIsGiven) {
            throw new ConflictException(
                `Role with id=${roleID} is already given to user`,
            );
        }
        await RoleRepository.giveRoleToUser(userID, roleID);
    }

    static async revokeRoleFromUser(userID, roleID) {
        const roleIsGiven = await RoleService.isRoleGivenToUser(userID, roleID);
        if (!roleIsGiven) {
            throw new ConflictException(
                `Role with id=${roleID} is not given to user`,
            );
        }
        await RoleRepository.revokeRoleFromUser(userID, roleID);
    }
}

module.exports = RoleService;
