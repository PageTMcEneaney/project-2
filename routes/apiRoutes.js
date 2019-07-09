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

  app.get("/api/:type/:query", function (req, res) {
    var type = req.params.type;
    var query = req.params.query.split("+").join(" ");

    console.log("query: " + query)

    switch (type) {
      case "title":
        db.Songs.findAll({ where: { title: query } }).then(function (data) {
          res.json(data);
        });
        break;
      case "artist":
        db.Songs.findAll({ where: { artist: query } }).then(function (data) {
          res.json(data);
        });
        break;
      case "year":
        db.Songs.findAll({ where: { year: query } }).then(function (data) {
          res.json(data);
        });
        break;
      case "genre":
        db.Songs.findAll({ where: { genre: query } }).then(function (data) {
          res.json(data);
        });
        break;
      case "album":
        db.Songs.findAll({ where: { album: query } }).then(function (data) {
          res.json(data);
        });
        break;
      case "duet":
        db.Songs.findAll({ where: { duet: query } }).then(function (data) {
          res.json(data);
        });
        break;
    };
  });

  app.post("/api/spotify", function (req, res) {
    //parsing the result back into a json object
    var keys = JSON.parse(Object.keys(req.body).toString());
    var type = keys.type.toLowerCase();
    var query = keys.query.toLowerCase();

    console.log(type, query);

    switch (type) {
      case "track":
        spotify.search({ type: "track", query: query, limit: 5 }, function (err, data) {
          if (err) {
            return console.log("Error occurred: " + err);
          }
          console.log(
            data.tracks.items[0].name,
            data.tracks.items[0].artists[0].name
          );
        });
        break;
      case "artist":
        query = "artist:" + query;
        spotify.search({ type: "track", query: query, limit: 5 }, function (err, data) {
          if (err) {
            return console.log("Error occurred: " + err);
          }
          console.log(
            data.tracks.items[0].name,
            data.tracks.items[0].artists[0].name
          );
        });
        break;
      case "year":
        query = "year:" + query;
        spotify.search({ type: "track", query: query, limit: 5 }, function (err, data) {
          if (err) {
            return console.log("Error occurred: " + err);
          }
          console.log(
            data.tracks.items[0].name,
            data.tracks.items[0].artists[0].name
          );
        });
        break;
      case "genre":
        query = "genre:" + query;
        spotify.search({ type: "track", query: query, limit: 5 }, function (err, data) {
          if (err) {
            return console.log("Error occurred: " + err);
          }
          console.log(
            data.tracks.items[0].name,
            data.tracks.items[0].artists[0].name
          );
        });
        break;
      case "album":
        query = "album:" + query;
        spotify.search({ type: "track", query: query, limit: 5 }, function (err, data) {
          if (err) {
            return console.log("Error occurred: " + err);
          }
          console.log(
            data.tracks.items[0].name,
            data.tracks.items[0].artists[0].name
          );
        });
        break;
        case "lyrics":
          //use musixmatch to get lyrics
        break;
      default:
        console.log("oops, something went wrong");
    };

    //   // var condensed =
    //   //   "\nArtist: " +
    //   //   data.tracks.items[0].album.artists[0].name +
    //   //   "\nTrack: " +
    //   //   data.tracks.items[0].name +
    //   //   "\nGenre: " +
    //   //   data.tracks.items[0].name +
    //   //   "\nAlbum: " +
    //   //   data.tracks.items[0].album.name +
    //   //   "\nLink: " +
    //   //   data.tracks.items[0].href +
    //   //   "\n------------------------------";
    //   // console.log(condensed);
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Songs.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/track/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
