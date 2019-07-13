var db = require("../models");
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Songs.findAll({}).then(function(data) {
      res.render("index", {
        msg: "Karaoke!!",
        examples: data
      });
    });

    //PASSPORT ROUTES
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
  //END OF PASSPORT ROUTES

  app.get("/profile", function(req, res) {
    db.Songs.findAll({}).then(function(data) {
      res.render("profile");
    });
  });

  app.get("/:type/:query", function(req, res) {
    var type = req.params.type;
    var query = req.params.query.split("+").join(" ");
    console.log("query: " + query);

    //switch statement for api query
    // switch (type) {
    //   case "title":
    //     db.Songs.findAll({ where: { title: query } }).then(function(data) {
    //       res.render("index", {

    //       })
    //     });
    //     break;
    //   case "artist":
    //     db.Songs.findAll({ where: { artist: query } }).then(function(data) {
    //       res.json(data);
    //     });
    //     break;
    //   case "year":
    //     db.Songs.findAll({ where: { year: query } }).then(function(data) {
    //       res.json(data);
    //     });
    //     break;
    //   case "genre":
    //     db.Songs.findAll({ where: { genre: query } }).then(function(data) {
    //       res.json(data);
    //     });
    //     break;
    //   case "album":
    //     db.Songs.findAll({ where: { album: query } }).then(function(data) {
    //       res.json(data);
    //     });
    //     break;
    //   case "duet":
    //     db.Songs.findAll({ where: { duet: query } }).then(function(data) {
    //       res.json(data);
    //     });
    //     break;
    // }
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

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  app.post("/update", function (req, res) {
    console.log("test: ", req);
  });
};
