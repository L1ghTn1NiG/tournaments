const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/users/user');

const env = require('../env');

const setupPassportStrategies = (passport) => {
    const extractJwtFromCookiesField = (field) => {
        return (req) => {
            let token = null;
            if (req && req.cookies && req.cookies[field]) {
                token = req.cookies[field];
            }
            return token;
        };
    };

    const options = {
        jwtFromRequest: extractJwtFromCookiesField('jwt'),
        secretOrKey: env.JWTPrivateKey,
    };

    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await User.findOne({
                    attributes: ['id'],
                    where: { id: payload.id },
                    raw: true,
                });
                if (user) {
                    return done(null, user.id);
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
            } catch (err) {
                done(err, false);
            }
        }),
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (user, done) {
        User.findOne({
            attributes: ['id'],
            where: { id: user.id },
            raw: true,
        }).then((user) => {
            done(null, user.id);
        });
    });
};

module.exports = setupPassportStrategies;
