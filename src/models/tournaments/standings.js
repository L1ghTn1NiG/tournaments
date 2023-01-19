const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize').sequelize;

const Standings = sequelize.define(
    'standings',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        winnerId: {
            type: DataTypes.INTEGER,
            field: 'winner_id',
            referencesTo: 'team',
            referencesKey: 'id',
            allowNull: true,
        },
        rivalLeftId: {
            type: DataTypes.INTEGER,
            field: 'rival_left_id',
            referencesTo: 'team',
            referencesKey: 'id',
            allowNull: true,
        },
        rivalRightId: {
            type: DataTypes.INTEGER,
            field: 'rival_right_id',
            referencesTo: 'team',
            referencesKey: 'id',
            allowNull: true,
        },
        round: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tournamentId: {
            type: DataTypes.INTEGER,
            field: 'tournament_id',
            referencesTo: 'tournament',
            referencesKey: 'id',
            allowNull: false,
        },
    },
    {
        tableName: 'standings',
        paranoid: true,
        timestamps: true,
        createdAt: true,
        updatedAt: false,
        deletedAt: true,
    },
);

module.exports = Standings;
