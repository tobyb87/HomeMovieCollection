module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  },
    {
      // We're saying that we want our Movie to have more info
      classMethods: {
        associate: function(models) {
          // An Movie (foreignKey) is required 
          Post.belongsTo(models.Movie, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return Post;
};
