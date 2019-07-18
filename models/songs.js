module.exports = function(sequelize, DataTypes) {
  var Songs = sequelize.define(
    "Songs",
    {
      title: DataTypes.STRING,
      artist: DataTypes.STRING,
      year: DataTypes.INTEGER,
      genre: DataTypes.STRING,
      album: DataTypes.STRING,
      duet: DataTypes.BOOLEAN,
      karafunID: DataTypes.INTEGER,
      spotifyID: DataTypes.STRING,
      youtubeURL: DataTypes.STRING,
      duration: DataTypes.DECIMAL,
      popularity: DataTypes.INTEGER,
      explicit: DataTypes.BOOLEAN,
      languages: DataTypes.STRING,
      lyrics: DataTypes.TEXT
    },
    {
      timestamps: false
    }
  );

  var Users = sequelize.define(
    "Users",
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      timestamps: false
    }
  );

  var SwingTable = sequelize.define(
    "SwingTable",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        }
      },
      songId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Songs",
          key: "id"
        }
      },
      rating: DataTypes.INTEGER
    },
    {
      timestamps: false
    }
  );

  Songs.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Songs.belongsToMany(models.Users, {
      through: "SwingTable",
      as: "users",
      foreignKey: "userId"
    });
  };

  Users.associate = function(models) {
    Users.belongsToMany(models.Songs, {
      through: "SwingTable",
      as: "songs",
      foreignKey: "songId"
    });
  };

  return Songs, Users, SwingTable;
};

// CREATE TABLE `songs` (
// 	`song_id` INT NOT NULL AUTO_INCREMENT,
//     `artist` VARCHAR(100) NOT NULL,
// 	`track` VARCHAR(100) NOT NULL,
//     `genre` VARCHAR(100) NOT NULL,
// 	`year` INT(4) NOT NULL,
// 	`album` VARCHAR(100) NOT NULL,
// 	`youtubeURL` VARCHAR(200),
// 	`spotifyID` VARCHAR(200),
// 	`duration` DECIMAL(10,2),
// 	`lyrics` VARCHAR(8000),
//     PRIMARY KEY (`song_id`)
// );

// CREATE TABLE `users` (
// 	`user_id` INT NOT NULL AUTO_INCREMENT,
//     `name` VARCHAR(100) NOT NULL,
//     PRIMARY KEY (`user_id`)
// );
