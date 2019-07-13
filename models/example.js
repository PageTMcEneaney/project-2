// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model

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
  return Songs;
};
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
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
