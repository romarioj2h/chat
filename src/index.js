const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes/index')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const UserModel = require('./models/user')
const morgan = require('morgan')
const flash = require('connect-flash')
require('dotenv').config()

passport.use(new JwtStrategy(
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
))

passport.serializeUser(function (user, done) {
    done(null, user);
})
passport.deserializeUser(function (user, done) {
    done(null, user);
})

app.use(passport.initialize())
app.use(passport.session())
app.use(morgan('dev'))
app.use(express.json())
app.use('/', routes)
app.use(flash())

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})