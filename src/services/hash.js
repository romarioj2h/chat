const bcrypt = require('bcrypt')

const Hash = {
    getHash: (value) => {
        const saltRounds = 10;
        return bcrypt.hashSync(value, saltRounds);
    },
    compare(value, hash) {
        return bcrypt.compareSync(value, hash);
    }
}

module.exports = Hash;