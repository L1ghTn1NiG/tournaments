const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize').sequelize;

const Team = sequelize.define(
    'team',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'team',
        paranoid: true,
        timestamps: true,
        createdAt: true,
        updatedAt: false,
        deletedAt: true,
    },
);

module.exports = Team;
