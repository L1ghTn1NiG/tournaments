const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize').sequelize;

const UsersRoles = sequelize.define(
    'usersRoles',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
    },
    {
        tableName: 'users_roles',
        timestamps: false,
    },
);

module.exports = UsersRoles;
