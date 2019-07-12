var db = require("../models");
var Spotify = require("node-spotify-api");
var keys = require("./../keys.js");
var spotify = new Spotify(keys.spotify);
// var $ = require("jquery");
var trackObject = [];

var parseTracks = function(type, query, data) {
  trackObject = [];
  for (var i = 0; i < data.tracks.items.length; i++) {
    //parsing the date string to return the year only
    var date = data.tracks.items[i].album.release_date.split("-");
    var year = date[0];

    //create array of objects w/spotify data
    trackObject.push({
      type: type,
      query: query,
      track: data.tracks.items[i].name,
      artist: data.tracks.items[i].artists[0].name,
      year: year,
      album: data.tracks.items[i].album.name,
      spotifyID: data.tracks.items[i].id,
      popularity: data.tracks.items[i].popularity,
      duration: data.tracks.items[i].duration_ms
    });
  }

  //for loop to update database with new spotify data
  for (var j = 0; j < trackObject.length; j++) {
    matchTracks(trackObject[j], j);
  }
};

var matchTracks = function(tracks, j) {
  var artist = tracks.artist;
  var title = tracks.track;
  var album = tracks.album;
  var spotifyID = tracks.spotifyID;
  var duration = tracks.duration;
  var popularity = tracks.popularity;
  var year = tracks.year;

  //query db to find matching records
  db.Songs.findAll({
    where: {
      artist: artist,
      title: title
    }
  }).then(function(data) {
    //if there is a matching record, update db with spotify info
    if (data[0] !== undefined) {
      console.log("Record #" + j + "found: " + artist + title + " updated");
      updateTracks(artist, title, album, spotifyID, duration, popularity);
    } else {
      //if there is no match, create a new record and populate with spotify info
      console.log("Record #" + j + "not found: " + artist + title + " created");
      createTracks(artist, title, album, spotifyID, duration, year, popularity);
    }
  });
};

var updateTracks = function(
  artist,
  title,
  album,
  spotifyID,
  duration,
  popularity
) {
  //if there is a matching record, update db with spotify info
  db.Songs.update(
    {
      album: album,
      spotifyID: spotifyID,
      duration: duration,
      popularity: popularity
    },
    {
      where: {
        artist: artist,
        title: title
      }
    }
  ).then(function(data) {
    console.log("updated" + data + "record for: " + artist + " - " + title);
  });
};

var createTracks = function(
  artist,
  title,
  album,
  spotifyID,
  duration,
  year,
  popularity
) {
  //if there is no match, create a new record and populate with spotify info
  db.Songs.create({
    title: title,
    artist: artist,
    album: album,
    spotifyID: spotifyID,
    duration: duration,
    year: year,
    popularity: popularity
  }).then(function(data) {
    console.log("created record for: " + artist + " - " + title);
  });
};

module.exports = function(app) {
  // Get all songs in the db
  app.get("/api/songs", function(req, res) {
    db.Songs.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  // Get specific results based on artist/track/etc and the query
  app.get("/api/:type/:query", function(req, res) {
    var type = req.params.type;
    var query = req.params.query.split("+").join(" ");
    console.log("query: " + query);

    //switch statement for api query
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
    }
  });

  // spotify API call based on user search
  app.post("/api/spotify", function(req, res) {
    //parsing the result back into a json object
    var keys = JSON.parse(Object.keys(req.body).toString());
    var type = keys.type.toLowerCase();
    var query = keys.query.toLowerCase();

    // switch statement to generate unique url for spotify query
    switch (type) {
      case "track":
        spotify.search({ type: "track", query: query, limit: 5 }, function(
          err,
          data
        ) {
          if (err) {
            return console.log("Error occurred: " + err);
          }
          parseTracks(type, query, data);
        });
        break;
      case "artist":
        query = "artist:" + query;
        spotify.search({ type: "track", query: query, limit: 5 }, function(
          err,
          data
        ) {
          if (err) {
            return console.log("Error occurred: " + err);
          }
          parseTracks(type, query, data);
        });
        break;
      case "year":
        query = "year:" + query;
        spotify.search({ type: "track", query: query, limit: 5 }, function(
          err,
          data
        ) {
          if (err) {
            return console.log("Error occurred: " + err);
          }
          parseTracks(type, query, data);
        });
        break;
      case "genre":
        query = "genre:" + query;
        spotify.search({ type: "track", query: query, limit: 5 }, function(
          err,
          data
        ) {
          if (err) {
            return console.log("Error occurred: " + err);
          }
          parseTracks(type, query, data);
        });
        break;
      case "album":
        query = "album:" + query;
        spotify.search({ type: "track", query: query, limit: 5 }, function(
          err,
          data
        ) {
          if (err) {
            return console.log("Error occurred: " + err);
          }
          parseTracks(type, query, data);
        });
        break;
      case "lyrics":
        //use musixmatch to get lyrics
        break;
      default:
        console.log("oops, something went wrong");
    }
    res.json(trackObject);
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
};
