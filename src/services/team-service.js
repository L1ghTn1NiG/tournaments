const TeamRepository = require('../repositories/team-repository');
const TeamMembersRepository = require('../repositories/team-members-repository');
const { AccessDeniedError } = require('sequelize');
const { invitationCodes } = require('../globals');
const { NotFoundException } = require('../classes/errors/4xx');

function getToken(length) {
    let result = '';
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        );
    }
    return result;
}

class TeamService {
    static async createTeam(creatorId, name) {
        const team = await TeamRepository.createTeam(creatorId, name);
        await TeamMembersRepository.addMember(team.id, creatorId);
    }

    static async getInvitationToken(creatorId, teamId) {
        const team = await TeamRepository.readTeam(teamId);
        if (!team) {
            throw new NotFoundException('Team not exist');
        }
        if (team.creatorId !== creatorId) {
            throw new AccessDeniedError('You not a creator of team');
        }
        const token = getToken(20);
        invitationCodes[token] = teamId;
    }

    static async joinByInvitationToken(userId, token) {
        const teamId = invitationCodes[token];
        if (!teamId) {
            throw new AccessDeniedError('Token expired');
        }
        await TeamMembersRepository.addMember(teamId, userId);
        delete invitationCodes[token];
    }

    static async readList() {
        return TeamRepository.listTeams();
    }

    static async readMembersList(teamId) {
        const team = await TeamRepository.readTeam(teamId);
        if (!team) {
            throw new NotFoundException('Team not found');
        }
        return TeamMembersRepository.listMembers(team.id);
    }

    static async deleteTeam(userId, teamId) {
        const team = await TeamRepository.readTeam(teamId);
        if (!team) {
            throw new NotFoundException('Team not exist');
        }
        if (team.creatorId !== userId) {
            throw new AccessDeniedError('You not a creator of team');
        }
        await TeamRepository.deleteTeam(team.id);
    }
}

module.exports = TeamService;
