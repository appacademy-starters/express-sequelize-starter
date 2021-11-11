'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tweet = sequelize.define('Tweet', {
    message: DataTypes.STRING
  }, {});
  Tweet.associate = function(models) {
    // associations can be defined here
    Tweet.belongsTo(models.User,{foreignKey:'userId'});
  };
  return Tweet;
};