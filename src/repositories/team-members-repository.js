const TeamsMembers = require('../models/teams/teams-members');

class TeamMembersRepository {
    static async addMember(teamId, userId) {
        return TeamsMembers.create({
            teamId,
            userId,
        });
    }

    static async removeMember(teamId, userId) {
        const entry = await TeamsMembers.findOne({
            teamId,
            participantId: userId,
        });
        entry.destroy();
    }

    static async listMembers(teamId) {
        return TeamsMembers.findAll({
            include: ['userId'],
            where: { teamId },
        });
    }
}

module.exports = TeamMembersRepository;
