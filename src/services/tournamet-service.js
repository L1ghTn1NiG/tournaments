const TournamentRepository = require('../repositories/tournament-repository');
const { recruitment } = require('../globals');
const {
    NotFoundException,
    BadRequestException,
} = require('../classes/errors/4xx');
const StandingsRepository = require('../repositories/standings-repository');

class TournametService {
    static async create(name, description, participantsCount) {
        const tournament = await TournamentRepository.create(
            name,
            description,
            participantsCount,
        );
        recruitment[tournament.id] = [];
    }

    static async addParticipant(tournamentId, teamId) {
        const tournament = await TournamentRepository.readById(tournamentId);
        const pcount = Math.ceil(Math.pow(2, tournament.participantsCount));
        if (!tournament) {
            throw new NotFoundException('Tournament not found');
        }
        if (recruitment[tournament.id].includes(teamId)) {
            throw new BadRequestException('Team already added');
        }
        if (recruitment[tournament.id].length === pcount) {
            throw new BadRequestException(
                'Tournament already filled with participants',
            );
        }
        recruitment[tournament.id].push(teamId);
    }

    static async startTournament(tournamentId) {
        // Get tournament
        const tournament = await TournamentRepository.readById(tournamentId);
        const pcount = Math.ceil(Math.pow(2, tournament.participantsCount));
        // Check exceptions
        if (!tournament) {
            throw new NotFoundException('Tournament not found');
        }
        if (tournament.stage !== 'recruitment') {
            throw new NotFoundException(
                'Tournament already started or finished',
            );
        }
        if (recruitment[tournament.id].length !== pcount) {
            throw new BadRequestException('Not enough tournament members');
        }
        // Add basic standings node
        const teamsIdList = recruitment[tournament.id];
        const promises = [];
        for (let i = 0; i < teamsIdList.length; i += 2) {
            promises.push(
                StandingsRepository.createNode(
                    tournamentId,
                    tournament.participantsCount - 1,
                    teamsIdList[i],
                    teamsIdList[i + 1],
                ),
            );
        }
        await Promise.all(promises);
        await TournamentRepository.setStage(tournamentId, 'active');
    }

    static async;
}

module.exports = TournametService;
