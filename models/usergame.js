'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static #encrypt = (password) => bcrypt.hashSync(password, 10)

    static register = ({username, email, password}) => {
      const encryptedPassword = this.#encrypt(password);
      return this.create({username, email, password: encryptedPassword});
    };

    generateToken = () => {
      const payload = {
        id: this.id,
        username: this.username
      }

      const rahasia = 'this is a secret key'

      const token = jwt.sign(payload, rahasia)
      return token
    }

  checkPassword = (password) => bcrypt.compareSync(password, this.password)

  static authenticate = async ({username, password}) => {
    try{
      const userGames = await this.findOne({where: {username}})

    if(!userGames) return Promise.reject('User not found')

    const isPasswordValid= userGames.checkPassword(password)
    if(!isPasswordValid) Promise.reject('Wrong Password')
    return Promise.resolve(userGames)
    }catch(err){
      return Promise.reject(err)
    }
  }
  }
  UserGame.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserGame',
  });
  return UserGame;
};