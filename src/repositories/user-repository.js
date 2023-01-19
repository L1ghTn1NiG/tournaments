const User = require('../models/users/user');
const Role = require('../models/users/role');
const bcrypt = require('bcryptjs');

class UserRepository {
    static async create(personalInfo) {
        const salt = bcrypt.genSaltSync(3);
        const password = personalInfo.password;

        return User.create({
            username: personalInfo.username,
            email: personalInfo.email,
            password: bcrypt.hashSync(password, salt),
        });
    }

    static async getList() {
        return User.findAll({
            attributes: ['id', 'username', 'email'],
            include: [
                {
                    model: Role,
                    as: 'roles',
                    // Excluded UsersRoles mapping object from results, cool!
                    // https://stackoverflow.com/questions/45070595/sequelize-exclude-belongs-to-many-mapping-object
                    through: { attributes: [] },
                },
            ],
        });
    }

    static async updateByID(userID, personalInfo) {
        const user = await User.findByPk(userID);
        const salt = bcrypt.genSaltSync(3);
        const password = personalInfo.password;

        return user.update({
            username: personalInfo.username,
            email: personalInfo.email,
            password: bcrypt.hashSync(password, salt),
        });
    }

    static async deleteByID(userID) {
        const user = await User.findByPk(userID);
        await user.destroy();
    }

    static async getByID(userId) {
        return User.findOne({
            attributes: ['id', 'username', 'email'],
            where: { id: userId },
            include: [
                {
                    model: Role,
                    as: 'roles',
                    // Excluded UsersRoles mapping object from results, cool!
                    // https://stackoverflow.com/questions/45070595/sequelize-exclude-belongs-to-many-mapping-object
                    through: { attributes: [] },
                },
            ],
        });
    }

    static async getByEMail(email) {
        return User.findOne({
            attributes: ['id', 'username', 'email', 'password'],
            where: { email: email },
            include: [
                {
                    model: Role,
                    as: 'roles',
                    // Excluded UsersRoles mapping object from results, cool!
                    // https://stackoverflow.com/questions/45070595/sequelize-exclude-belongs-to-many-mapping-object
                    through: { attributes: [] },
                },
            ],
        });
    }

    static async getByUsername(username) {
        return User.findOne({
            attributes: ['id', 'username', 'email', 'password'],
            where: { username: username },
            include: [
                {
                    model: Role,
                    as: 'roles',
                    // Excluded UsersRoles mapping object from results, cool!
                    // https://stackoverflow.com/questions/45070595/sequelize-exclude-belongs-to-many-mapping-object
                    through: { attributes: [] },
                },
            ],
        });
    }
}

module.exports = UserRepository;
