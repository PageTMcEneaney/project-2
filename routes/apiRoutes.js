var db = require("../models");
var Spotify = require("node-spotify-api");
var keys = require("./../keys.js");
var spotify = new Spotify(keys.spotify);

module.exports = function (app) {
  // Get all examples
  app.get("/api/songs", function (req, res) {
    db.Songs.findAll({}).then(function (data) {
      res.json(data);
    });
  });

  app.get("/api/songs/artist/:query", function(req, res) {
    var query = req.params.query;
    db.Songs.findAll({ artist: query }).then(function(data) {
      res.json(data);
    });
  });

  app.post("/api/spotify/:type/:query", function(req, res) {
    var type = req.params.type;
    var query = req.params.query;
    spotify.search({ type: type, query: query }, function(err, data) {
      if (err) {
        console.log(data);
        return console.log("Error occurred: " + err);
      }

      // var condensed =
      //   "\nArtist: " +
      //   data.tracks.items[0].album.artists[0].name +
      //   "\nTrack: " +
      //   data.tracks.items[0].name +
      //   "\nGenre: " +
      //   data.tracks.items[0].name +
      //   "\nAlbum: " +
      //   data.tracks.items[0].album.name +
      //   "\nLink: " +
      //   data.tracks.items[0].href +
      //   "\n------------------------------";
      // console.log(condensed);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Songs.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/track/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};
