const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize').sequelize;

const TeamsMembers = sequelize.define(
    'teamsMembers',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
    },
    {
        tableName: 'teams_members',
        paranoid: true,
        timestamps: true,
        createdAt: true,
        updatedAt: false,
        deletedAt: true,
    },
);

module.exports = TeamsMembers;
