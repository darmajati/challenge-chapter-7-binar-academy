'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGameBiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserGameBiodata.init({
    full_name: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    gender: DataTypes.STRING,
    user_game_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserGameBiodata',
  });
  return UserGameBiodata;
};