const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../services/database')
const Hash = require('./../services/hash')

class User extends Model {

    isValidPassword(password) {
        return Hash.compare(password, this.password);
    }
}

User.init({
    // Model attributes are defined here
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('password', Hash.getHash(value))
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    sequelize,
    modelName: 'user'
});

module.exports = User