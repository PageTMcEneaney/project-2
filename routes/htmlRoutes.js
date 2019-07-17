var db = require("../models");
// var Sequelize = require("sequelize");

// var searchResults = function(data) {

// }

var path = require("path");

module.exports = function (app) {
  // Load index page

  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/signup", function (req, res) {
    db.Songs.findAll({}).then(function (data) {
      res.render("signup", {
        msg: "Karaoke!!",
        examples: data
      });
    });
  });

  app.get("/login", function (req, res) {
    db.Songs.findAll({}).then(function (data) {
      res.render("login", {
        msg: "Karaoke!!",
        examples: data
      });
    });
  });

  // ----------------------------------
  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.post("/update", function (req, res) {


    //var array = [];
    //for (var i = 0; i < dataA.length; i++) {
    //array.push(dataA[i].id);
    //}
    // console.log(array);

    var data = JSON.parse(req.body.data);
    var dataObject = {
      songs: data
    };
    // var dataA = [{ id: 5, title: "test" }, { id: 10, title: "test2" }];
    res.render("index", {
      msg: "Karaoke MESSAGE FROM APP.POST!!",
      // examples: data,
      //songs: data
    });

    // res.redirect("/query");
  });

  // app.get("/profile/:userID", function(req, res) {
  //   if (req.user) {
  //     res.redirect("/profile" + userID);
  //   }
  //   res.sendFile(path.join(__dirname, "../public/signup.html"));

  // })

  app.get("/query", function (req, res) {
    res.render("query");
  });

  app.get("/results/:songArtist", function (req, res) {
    //console.log(req.params.songArtist);
    var text = req.params.songArtist.split("-");
    var song = text[0]
      .trim()
      .split("+")
      .join(" ");

    var youtube = text[0];
    var artist = text[1]
      .trim()
      .split("+")
      .join(" ");

    res.render("songResult", {
      song: song,
      youtube: youtube,
      artist: artist
    });
    // res.send("songResult");
    // res.sendFile(path.join(__dirname + "./../views/result.html"));

    app.get("/maps", function (req, res) {
      res.render("maps");
    })


    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
      res.render("404");
    });
  });
};
