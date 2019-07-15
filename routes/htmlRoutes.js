var db = require("../models");
// var Sequelize = require("sequelize");

// var searchResults = function(data) {

// }

module.exports = function(app) {
  // Load index page

  app.get("/", function(req, res) {
    var testData = [
      {
        id: 149,
        title: "Shallow",
        artist: "Lady Gaga",
        year: 2018,
        genre: null,
        album: "A Star Is Born Soundtrack",
        duet: null,
        karafunID: null,
        spotifyID: "2VxeLyX666F8uXCJ0dZF8B",
        youtubeURL: null,
        duration: "215733",
        popularity: 89,
        explicit: null,
        languages: null,
        lyrics: null
      },
      {
        id: 151,
        title: "Bad Romance",
        artist: "Lady Gaga",
        year: 2019,
        genre: null,
        album: "90s, 00s, 10s",
        duet: null,
        karafunID: null,
        spotifyID: "37jJFzc0BuxjjUGtDOm570",
        youtubeURL: null,
        duration: "294466",
        popularity: 0,
        explicit: null,
        languages: null,
        lyrics: null
      },
      {
        id: 152,
        title: "Just Dance",
        artist: "Lady Gaga",
        year: 2019,
        genre: null,
        album: "Middle School Dance",
        duet: null,
        karafunID: null,
        spotifyID: "0hEbOdpbwflSSsfPhQLu00",
        youtubeURL: null,
        duration: "241933",
        popularity: 0,
        explicit: null,
        languages: null,
        lyrics: null
      },
      {
        id: 153,
        title: "Telephone",
        artist: "Lady Gaga",
        year: 2019,
        genre: null,
        album: "00s Summer",
        duet: null,
        karafunID: null,
        spotifyID: "0zrYCyeldDfpZXxExQWwIf",
        youtubeURL: null,
        duration: "220626",
        popularity: 0,
        explicit: null,
        languages: null,
        lyrics: null
      },
      {
        id: 357,
        title: "Born This Way",
        artist: "Lady Gaga",
        year: 2019,
        genre: null,
        album: "90s, 00s, 10s",
        duet: null,
        karafunID: null,
        spotifyID: "31iqvqj47qUJVo8WM3X6k1",
        youtubeURL: null,
        duration: "260253",
        popularity: 0,
        explicit: null,
        languages: null,
        lyrics: null
      }
    ];
    // console.log(testData[0]);
    res.render("index");
  });

  // ----------------------------------
  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.post("/update", function(req, res) {
    var dataA = [
      {
        id: 149,
        title: "Shallow",
        artist: "Lady Gaga",
        year: 2018,
        genre: null,
        album: "A Star Is Born Soundtrack",
        duet: null,
        karafunID: null,
        spotifyID: "2VxeLyX666F8uXCJ0dZF8B",
        youtubeURL: null,
        duration: "215733",
        popularity: 89,
        explicit: null,
        languages: null,
        lyrics: null
      },
      {
        id: 151,
        title: "Bad Romance",
        artist: "Lady Gaga",
        year: 2019,
        genre: null,
        album: "90s, 00s, 10s",
        duet: null,
        karafunID: null,
        spotifyID: "37jJFzc0BuxjjUGtDOm570",
        youtubeURL: null,
        duration: "294466",
        popularity: 0,
        explicit: null,
        languages: null,
        lyrics: null
      },
      {
        id: 152,
        title: "Just Dance",
        artist: "Lady Gaga",
        year: 2019,
        genre: null,
        album: "Middle School Dance",
        duet: null,
        karafunID: null,
        spotifyID: "0hEbOdpbwflSSsfPhQLu00",
        youtubeURL: null,
        duration: "241933",
        popularity: 0,
        explicit: null,
        languages: null,
        lyrics: null
      },
      {
        id: 153,
        title: "Telephone",
        artist: "Lady Gaga",
        year: 2019,
        genre: null,
        album: "00s Summer",
        duet: null,
        karafunID: null,
        spotifyID: "0zrYCyeldDfpZXxExQWwIf",
        youtubeURL: null,
        duration: "220626",
        popularity: 0,
        explicit: null,
        languages: null,
        lyrics: null
      },
      {
        id: 357,
        title: "Born This Way",
        artist: "Lady Gaga",
        year: 2019,
        genre: null,
        album: "90s, 00s, 10s",
        duet: null,
        karafunID: null,
        spotifyID: "31iqvqj47qUJVo8WM3X6k1",
        youtubeURL: null,
        duration: "260253",
        popularity: 0,
        explicit: null,
        languages: null,
        lyrics: null
      }
    ];
    // console.log(dataA[1]);

    var array = [];
    for (var i = 0; i < dataA.length; i++) {
      array.push(dataA[i].id);
    }
    // console.log(array);

    var data = JSON.parse(req.body.data);
    var dataObject = {
      songs: data
    };
    // var dataA = [{ id: 5, title: "test" }, { id: 10, title: "test2" }];
    res.render("index", {
      msg: "Karaoke MESSAGE FROM APP.POST!!",
      // examples: data,
      songs: dataA
    });

    // res.redirect("/query");
  });

  app.get("/query", function(req, res) {
    res.render("query");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
