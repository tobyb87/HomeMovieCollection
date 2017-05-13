module.exports = function(sequelize, DataTypes) {
  var Movie = sequelize.define("Movie", {
    // Giving the Movie model a name of type STRING
    name: DataTypes.STRING
  },
    // 2nd "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      //  Posts
      classMethods: {
        associate: function(models) {
          // Associating Posts
          // When an Author is deleted, also delete any associated Posts
          Movie.hasMany(models.Post, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return Movie;
};

