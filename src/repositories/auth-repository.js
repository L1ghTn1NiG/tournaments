const jwt = require('jsonwebtoken');
const env = require('../env');

class AuthRepository {
    static async loginById(userId) {
        return jwt.sign(
            {
                id: userId,
            },
            env.JWTPrivateKey,
            {
                expiresIn: 60 * 60,
            },
        );
    }
}

module.exports = AuthRepository;
