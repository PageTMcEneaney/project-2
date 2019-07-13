$.ajax({
  url:
    "http://api.musixmatch.com/ws/1.1/track.search?q_track=We+Belong+Together&apikey=f2f5c2c5d02b5bca83ad9ae6342e9ce6",
  method: "GET",
  crossDomain: true,
  dataType: "jsonp"
}).then(function(response) {
  response.__setitem__("Content-type", "application/json");
  response.__setitem__("Access-Control-Allow-Origin", "*");
  console.log(response);
});

$("#lyricsLink").on("click", function() {
  window.open("https://www.youtube.com/results?search_query=" + $(this).text());
});
