const UserModel = require('./../models/user')
const jwt = require('jsonwebtoken')

const Authentication = {
    register: (req, res) => {
        let user = UserModel.build(req.body);
        user.save().then((user) => {
            res.send({
                status: 'success',
                data: {
                    id: user.id
                }
            });
        });
    },
    login: (req, res) => {
        if (!req.body.username) {
            res.status(401).json({ message: "no such user found" });
        }
        UserModel.findOne({ where: { username: req.body.username } }).then((user) => {
            if (user.isValidPassword(req.body.password)) {
                var payload = { id: user.id };
                var token = jwt.sign(payload, process.env.JWT_SECRET);
                res.json({ message: "ok", token: token });
            } else {
                res.status(401).json({ message: "invalid credentials" });
            }
        });
    }
}

module.exports = Authentication