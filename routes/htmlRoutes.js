var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Songs.findAll({}).then(function(data) {
      res.render("index", {
        msg: "Karaoke!!",
        examples: data
      });
    });
  });

  app.get("/signup", function(req, res) {
    db.Songs.findAll({}).then(function(data) {
      res.render("signup", {
        msg: "Karaoke!!",
        examples: data
      });
    });
  });

  app.get("/login", function(req, res) {
    db.Songs.findAll({}).then(function(data) {
      res.render("login", {
        msg: "Karaoke!!",
        examples: data
      });
    });
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

  // app.get("/profile/:userID", function(req, res) {
  //   if (req.user) {
  //     res.redirect("/profile" + userID);
  //   }
  //   res.sendFile(path.join(__dirname, "../public/signup.html"));

  // })

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
