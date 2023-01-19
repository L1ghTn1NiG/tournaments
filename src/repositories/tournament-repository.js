const Tournament = require('../models/tournaments/tournament');

class TournamentRepository {
    static async create(name, description, participantsCount) {
        return await Tournament.create({
            name,
            description,
            participantsCount,
            stage: 'recruitment',
            round: participantsCount - 1,
        });
    }

    static async list() {
        return Tournament.findAll();
    }

    static async readById(tournamentId) {
        return Tournament.findByPk(tournamentId);
    }

    static async setStage(tournamentId, stage) {
        await Tournament.update(
            {
                stage,
            },
            {
                where: {
                    id: tournamentId,
                },
            },
        );
    }
}

module.exports = TournamentRepository;
