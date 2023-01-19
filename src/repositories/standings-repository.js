const { Tournament, Standings } = require('../models');

class StandingsRepository {
    static async createNode(tournamentId, round, rivalLeftId, rivalRightId) {
        return Standings.create({
            winnerId: null,
            rivalLeftId,
            rivalRightId,
            round,
            tournamentId,
        });
    }

    static async createBasicStandings(tournamentId, teamsIdList) {
        const tournament = await Tournament.findByPk(tournamentId);
        const promises = [];
        for (let i = 0; i < teamsIdList.length; i += 2) {
            promises.push(
                Standings.create({
                    winnerId: null,
                    rivalLeftId: teamsIdList[i],
                    rivalRightId: teamsIdList[i + 1],
                    round: tournament.participantsCount - 1,
                    tournamentId,
                }),
            );
        }
        await Promise.all(promises);
    }
}

module.exports = StandingsRepository;
