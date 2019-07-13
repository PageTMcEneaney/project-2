// Get references to page elements
var $exampleText = $("#example-text");
// eslint-disable-next-line no-unused-vars
var $exampleDescription = $("#example-description");
var $dropdownSearch = $(".dropdown-item");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  // saveExample: function (example) {
  //   return $.ajax({
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     type: "POST",
  //     url: "api/examples",
  //     data: JSON.stringify(example)
  //   });
  // },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  },
  getSpotify: function(data) {
    return $.ajax({
      url: "api/spotify/",
      type: "POST",
      data: JSON.stringify(data)
    });
  },
  updateDB: function(tracks) {
    return $.ajax({
      url: "api/posts/",
      type: "PUT",
      data: tracks
    });
  },
  results: function() {
    return $.get({
      url: "/results",
      type: "GET"
      // data: songArtist
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var search = {
    query: $exampleText.val().trim(),
    type: $(".dropdown-toggle")
      .text()
      .trim()
  };

  API.getSpotify(search);

  // API.updateDB()
  $exampleText.val("");
  $dropdownSearch.val("");
};

var dropdownUpdate = function() {
  // eslint-disable-next-line prettier/prettier
  var type = $(this).text().trim();
  $(".dropdown-toggle").text(type);
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

$(".heartBtn").on("click", function() {
  if ($(this).text() === "♥") {
    $(this).text("♡");
  } else {
    $(this).text("♥");
  }
  console.log($(this).attr("value"));
});

$(".song").on("click", function() {
  console.log($(this).text());
  var songArtist = $(this)
    .text()
    .split("-");
  var song = songArtist[0]
    .trim()
    .split(" ")
    .join("+");
  var artist = songArtist[1]
    .trim()
    .split(" ")
    .join("+");

  songArtist = song + "-" + artist;
  console.log(songArtist);

  // $.get("/results/" + songArtist, function() {
  //   console.log("test");
  // });

  // window.location.replace("http://localhost:3000/results/We+Belong+Together-Mariah+Carey");
  // window.location.replace("http://localhost:3000/results/" + songArtist);
  window.location.href = "http://localhost:3000/results/" + songArtist;

  // API.results(text);
  // API.results();
});

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$dropdownSearch.on("click", dropdownUpdate);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
