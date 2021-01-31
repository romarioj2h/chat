const router = require('express').Router()
const authentication = require('./authentication')
const passport = require('passport')

router.use('/', authentication)

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        status: 'success',
        body: 'home page'
    });
})

module.exports = router