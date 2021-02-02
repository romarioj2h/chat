const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const UserModel = require('./../models/user')

module.exports = {
    strategy: new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        },
        function (jwt_payload, done) {
            UserModel.findOne(
                {
                    where: {
                        id: jwt_payload.id
                    }
                }
            ).then((user) => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            });
        }
    ),
    serializeUser: function (user, done) {
        done(null, user);
    },
    deserializeUser: function (user, done) {
        done(null, user);
    }
}