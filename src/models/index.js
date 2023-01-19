const Role = require('./users/role');
const UsersRoles = require('./users/users-roles');
const User = require('./users/user');
const Team = require('./teams/team');
const TeamsMembers = require('./teams/teams-members');
const Standings = require('./tournaments/standings');
const Tournament = require('./tournaments/tournament');

const models = {
    // Users and roles
    Role,
    UsersRoles,
    User,

    // Teams
    Team,
    TeamsMembers,

    // Tournaments
    Standings,
    Tournament,
};

const associate = async () => {
    models.Role.belongsToMany(models.User, { through: models.UsersRoles });
    models.User.belongsToMany(models.Role, { through: models.UsersRoles });

    models.User.hasMany(models.Team, { foreignKey: 'creator_id' });
    models.Team.belongsTo(models.User, { foreignKey: 'creator_id' });

    models.User.belongsToMany(models.Team, { through: models.TeamsMembers });
    models.Team.belongsToMany(models.User, { through: models.TeamsMembers });

    models.Standings.hasOne(models.User, { foreignKey: 'winner_id' });
    models.Standings.hasOne(models.User, { foreignKey: 'rival_left_id' });
    models.Standings.hasOne(models.User, { foreignKey: 'rival_right_id' });
};

module.exports = {
    ...models,
    associate,
};
