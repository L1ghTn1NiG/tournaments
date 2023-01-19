const AuthRepository = require('../repositories/auth-repository');
const UserRepository = require('../repositories/user-repository');

const bcrypt = require('bcryptjs');

const { UnauthorizedException } = require('../classes/errors/4xx');

class AuthService {
    static async loginWithEmailAndPassword(email, password) {
        const userWithGivenEmail = await UserRepository.getByEMail(email);
        if (!userWithGivenEmail) {
            throw new UnauthorizedException(
                'User with this email was not found',
            );
        }

        const matchingResult = bcrypt.compareSync(
            password,
            userWithGivenEmail.password,
        );
        if (!matchingResult) {
            throw new UnauthorizedException(
                'The entered password does not match',
            );
        }
        return AuthRepository.loginById(userWithGivenEmail.id);
    }

    static async loginWithUsernameAndPassword(username, password) {
        const userWithGivenUsername = await UserRepository.getByUsername(
            username,
        );
        if (!userWithGivenUsername) {
            throw new UnauthorizedException(
                'User with this username was not found',
            );
        }

        const matchingResult = bcrypt.compareSync(
            password,
            userWithGivenUsername.password,
        );
        if (!matchingResult) {
            throw new UnauthorizedException(
                'The entered password does not match',
            );
        }

        return AuthRepository.loginById(userWithGivenUsername.id);
    }
}

module.exports = AuthService;
