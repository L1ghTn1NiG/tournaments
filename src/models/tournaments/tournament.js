const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize').sequelize;

const Tournament = sequelize.define(
    'tournament',
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
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        participantsCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stage: {
            type: DataTypes.ENUM('recruitment', 'active, finished'),
            allowNull: false,
        },
        round: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: 'tournament',
        paranoid: true,
        timestamps: true,
        createdAt: true,
        updatedAt: false,
        deletedAt: true,
    },
);

module.exports = Tournament;
