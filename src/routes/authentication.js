const router = require('express').Router()
const Authentication = require('./../controllers/authentication')

router.post('/login', Authentication.login);
router.get('/login', (req, res) => {
    res.send('login page deleteme')
});
router.post('/register', Authentication.register)

module.exports = router;