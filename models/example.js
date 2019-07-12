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
