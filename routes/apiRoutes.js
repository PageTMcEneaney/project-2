var db = require("../models");
var Spotify = require("node-spotify-api");

var keys = require("./../keys.js");

var spotify = new Spotify(keys.spotify);

var spotifySong = function() {
  var song = "The Sign Ace of Base";
  if (process.argv[3]) {
    song = process.argv[3];
  } else if (whatItSays !== "") {
    song = whatItSays;
  }
  spotify.search({ type: "track", query: song }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }


    var condensed =
      "\nArtist: " +
      data.tracks.items[0].album.artists[0].name +
      "\nTrack: " +
      data.tracks.items[0].name +
      "\nGenre: " +
      data.tracks.items[0].name +
      "\nAlbum: " +
      data.tracks.items[0].album.name +
      "\nLink: " +
      data.tracks.items[0].href +
      "\n------------------------------";
    console.log("You searched: " + song);
    console.log(condensed);
  });
};

module.exports = function(app) {
  // Get all examples
  app.get("/api/favorites", function(req, res) {
    db.Songs.findAll({}).then(function(dbKaraoke) {
      res.json(dbKaraoke);
      console.table(dbKaraoke);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Songs.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/track/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};
