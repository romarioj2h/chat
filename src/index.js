require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes/index')
const passport = require('passport')
const morgan = require('morgan')
const passportService = require('./services/passport')

passport.use(passportService.strategy)
passport.serializeUser(passportService.serializeUser)
passport.deserializeUser(passportService.deserializeUser)

app.use(passport.initialize())
app.use(morgan('dev'))
app.use(express.json())
app.use('/', routes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})