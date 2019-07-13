var db = require("../models");
// var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // db.Songs.findAll({}).then(function(data) {
    res.render("index", {});
    // });

    //PASSPORT ROUTES
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    // res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/members.html"));
    console.log("linting: " + req + res);
  });
  //END OF PASSPORT ROUTES

  app.get("/profile", function(req, res) {
    // db.Songs.findAll({}).then(function(data) {
    console.log("linting: " + req + res);

    res.render("profile");
    // });
  });

  // app.get("/html/:type/:query", function(req, res) {
  //   var type = req.params.type;
  //   var query = req.params.query.split("+").join(" ");
  //   console.log("query: " + query);
  // });

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
    console.log("linting: " + req + res);

    res.render("404");
  });

  app.post("/update", function(req, res) {
    console.log("linting: " + req + res);

    console.log("test: ", req);
  });
};
