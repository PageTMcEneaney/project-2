var db = require("../models");
var Spotify = require("node-spotify-api");
var keys = require("./../keys.js");
var spotify = new Spotify(keys.spotify);
// var $ = require("jquery");
var trackObject = [];

var dbPost = function(type, query, data) {
  for (var i = 0; i < data.tracks.items.length; i++) {
    trackObject.push({
      type: type,
      query: query,
      track: data.tracks.items[i].name,
      artist: data.tracks.items[i].artists[0].name,
      year: data.tracks.items[i].album.release_date,
      album: data.tracks.items[i].album.name,
      spotifyID: data.tracks.items[i].id,
      popularity: data.tracks.items[i].popularity,
      duration: data.tracks.items[i].duration_ms
    });
  }

  // db.Songs.update({
  //     album: data.tracks.items[i].album.name,
  //     spotifyID: data.tracks.items[i].id
  //   },{
  //     where: {
  //       artist: data.tracks.items[i].artists[0].name,
  //       title: req.body.track
  //     }
  //   });

  console.log(trackObject);
  return trackObject;
};

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

  app.post("/api/spotify", function(req, res) {
    //parsing the result back into a json object
    var keys = JSON.parse(Object.keys(req.body).toString());
    var type = keys.type.toLowerCase();
    var query = keys.query.toLowerCase();
    // var data = {
    //   trackObject: []
    // };

    console.log(type, query);

    switch (type) {
      case "track":
        spotify.search({ type: "track", query: query, limit: 5 }, function(err, data) {
          if (err) {
            return console.log("Error occurred: " + err);
          }
          dbPost(type, query, data);
          console.log("in switch: ", trackObject);
          // var data = {
          //   tracks: trackObject
          // };
          // res.render("index", data);
        });
        break;
      case "artist":
        query = "artist:" + query;
        spotify.search({ type: "track", query: query, limit: 5 }, function(err, data) {
          if (err) {
            return console.log("Error occurred: " + err);
          }
          dbPost(type, query, data);
        });
        break;
      case "year":
        query = "year:" + query;
        spotify.search({ type: "track", query: query, limit: 5 }, function(err, data) {
          if (err) {
            return console.log("Error occurred: " + err);
          }
          dbPost(type, query, data);
        });
        break;
      case "genre":
        query = "genre:" + query;
        spotify.search({ type: "track", query: query, limit: 5 }, function(err, data) {
          if (err) {
            return console.log("Error occurred: " + err);
          }
          dbPost(type, query, data);
        });
        break;
      case "album":
        query = "album:" + query;
        spotify.search({ type: "track", query: query, limit: 5 }, function(err, data) {
          if (err) {
            return console.log("Error occurred: " + err);
          }
          dbPost(type, query, data);
        });
        break;
      case "lyrics":
        //use musixmatch to get lyrics
        break;
      default:
        console.log("oops, something went wrong");
    }
    // console.log(trackObject);
    // res.render("index", trackObject);
  });

  // app.get("/api/spotify", function(req, res) {
  //   return $.ajax({
  //     url: "api/examples",
  //     type: "GET"
  //   });
  // });

  // // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Songs.create(req.body).then(function (dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // Delete an example by id
  app.delete("/api/track/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.json(dbExample);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    console.log(req.body);
    // db.Songs.update(req.body, {
    //   where: {
    //     artist: req.body.artist,
    //     title: req.body.track
    //   }
    // }).then(function(dbPost) {
    //   res.json(dbPost);
    // });
  });
};
