const AuthService = require('../services/auth-service');
const UserService = require('../services/user-service');
const ResponseFormat = require('../helpers/response-format');

class AuthController {
    static async register(req, res) {
        const userObject = await UserService.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        res.status(200).json(
            ResponseFormat.success(200, 'Registered successfully', userObject),
        );
    }

    static async login(req, res) {
        const loginFunction = req.body.email
            ? AuthService.loginWithEmailAndPassword
            : AuthService.loginWithUsernameAndPassword;
        const login = req.body.email ? req.body.email : req.body.username;

        const token = await loginFunction(login, req.body.password);

        const sec = 1000;
        const min = 60 * sec;
        const hour = 60 * min;

        res.cookie('jwt', token, {
            maxAge: 2 * hour,
        });

        res.status(200).json(
            ResponseFormat.success(200, 'Logged in successfully', { token }),
        );
    }

    static async logout(req, res) {
        req.logout();
        res.clearCookie('jwt');
        res.status(200).json(
            ResponseFormat.success(200, 'Logged out successfully', {}),
        );
    }
}

module.exports = AuthController;
