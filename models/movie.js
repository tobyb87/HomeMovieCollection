module.exports = function(sequelize, DataTypes) {
  var Movie = sequelize.define("Movie", {
    // Giving the Movie model a name of type STRING
    name: DataTypes.STRING
  },
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      // We're saying that we want our Movie to have Posts
      classMethods: {
        associate: function(models) {
          // Associating Movie with Posts
          // When an Movie is deleted, also delete any associated Posts
          Movie.hasMany(models.Post, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return Movie;
};
