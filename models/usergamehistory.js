'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGameHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        this.belongsTo(models.UserGame, {
          foreignKey: 'user_game_id'
        })
      }
    }
  UserGameHistory.init({
    score: DataTypes.INTEGER,
    user_game_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserGameHistory',
  });
  return UserGameHistory;
};