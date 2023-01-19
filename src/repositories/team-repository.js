const Team = require('../models/teams/team');
const User = require('../models/users/user');

class TeamRepository {
    static async createTeam(creatorId, name) {
        Team.create({
            creatorId,
            name,
        });
    }

    static async readTeam(teamId) {
        return Team.findByPk(teamId, {
            include: User,
        });
    }

    static async listTeams() {
        return Team.findAll();
    }

    static async readTeamByCreatorId(creatorId) {
        return Team.findOne({
            where: { creatorId },
        });
    }

    static async deleteTeam(teamId) {
        const team = await Team.findByPk(teamId);
        team.destroy();
    }
}

module.exports = TeamRepository;
