var db = require("../models");
var Spotify = require("node-spotify-api");
var keys = require("./../keys.js");
var spotify = new Spotify(keys.spotify);

module.exports = function(app) {
  // Get all examples
  app.get("/api/songs", function(req, res) {
    db.Songs.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  app.get("/api/:type/:query", function(req, res) {
    var type = req.params.type;
    var query = req.params.query.split("+").join(" ");

    console.log("query: " + query)

    switch (type) {
    case "title":
      db.Songs.findAll({ where: { title: query } }).then(function(data) {
        res.json(data);
      });
      break;
    case "artist":
      db.Songs.findAll({ where: { artist: query } }).then(function(data) {
        res.json(data);
      });
      break;
    case "year":
      db.Songs.findAll({ where: { year: query } }).then(function(data) {
        res.json(data);
      });
      break;
    case "genre":
      db.Songs.findAll({ where: { genre: query } }).then(function(data) {
        res.json(data);
      });
      break;
    case "album":
      db.Songs.findAll({ where: { album: query } }).then(function(data) {
        res.json(data);
      });
      break;
    case "duet":
      db.Songs.findAll({ where: { duet: query } }).then(function(data) {
        res.json(data);
      });
      break;
    };
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
  app.post("/api/examples", function(req, res) {
    db.Songs.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/track/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
