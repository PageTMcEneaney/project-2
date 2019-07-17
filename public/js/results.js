var song = $("#resultSong").text();
var artist = $("#resultArtist").text();
getLyrics(song, artist);
//getLyrics();
// getLyricsNow(getLyrics());

// function getLyrics() {
//   // var trackID;
//   //var artistSearch = document.getElementById("artistSearch").value;
//   //document.getElementById("lyrics").textContent = "";
//   $.ajax({
//     type: "GET",
//     data: {
//       apikey: "f2f5c2c5d02b5bca83ad9ae6342e9ce6",
//       q_artist: "Awolnation",
//       // q_track: "Kill your heroes",
//       format: "jsonp",
//       callback: "jsonp_callback"
//     },
//     url: "https://api.musixmatch.com/ws/1.1/track.search",
//     dataType: "jsonp",
//     jsonpCallback: 'jsonp_callback',
//     contentType: 'application/json',
//     success: function (data) {
//       console.log(data);
//       console.log(data.message.body.track_list[0].track.album_coverart_350x350)
//       console.log(data.message.body.track_list[0].track.lyrics_id)
//       var rand = data.message.body.track_list[Math.floor(Math.random() * data.message.body.track_list.length)];
//       console.log(rand.track.track_id)
//       var thisTrack = (rand.track.track_id);
//       getLyricsNow(thisTrack);
//       //trackID = thisTrack;
//       var thisPic = rand.track.album_coverart_350x350;
//       console.log(thisPic)

//       var p = document.createElement("p");
//       p.textContent = thisTrack;
//       p.id = thisTrack;

//       var img = document.createElement("img")
//       img.setAttribute("src", thisPic)

//       document.getElementById("lyrics").appendChild(p).style.opacity = 0;
//       document.getElementById("lyrics").appendChild(img);
//       //document.getElementById("ghost").click();
//     },
//     error: function(jqXHR, textStatus, errorThrown) {
//       console.log(jqXHR);
//       console.log(textStatus);
//       console.log(errorThrown);
//     }
//   });
//   //return trackID;
// };

function getLyrics(song, artist) {
  // var trackID;
  //var artistSearch = document.getElementById("artistSearch").value;
  //document.getElementById("lyrics").textContent = "";
  $.ajax({
    type: "GET",
    data: {
      apikey: "f2f5c2c5d02b5bca83ad9ae6342e9ce6",
      q_track: song,
      q_artist: artist,
      // q_track: "Kill your heroes",
      format: "jsonp",
      callback: "jsonp_callback"
    },
    url: "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get",
    dataType: "jsonp",
    jsonpCallback: 'jsonp_callback',
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
      var lyrics = data.message.body.lyrics.lyrics_body;
      var fixedLyrics = lyrics.split("\n");
      console.log(fixedLyrics);
      for (var i = 0; i < fixedLyrics.length; i++) {
        $("#lyrics").append("<p>" + fixedLyrics[i] + "</p>");
      }
      //$("#lyrics").text(lyrics);
      // console.log(data.message.body.track_list[0].track.album_coverart_350x350)
      // console.log(data.message.body.track_list[0].track.lyrics_id)
      // var rand = data.message.body.track_list[Math.floor(Math.random() * data.message.body.track_list.length)];
      // console.log(rand.track.track_id)
      // var thisTrack = (rand.track.track_id);
      // getLyricsNow(thisTrack);
      // //trackID = thisTrack;
      // var thisPic = rand.track.album_coverart_350x350;
      // console.log(thisPic)

      // var p = document.createElement("p");
      // p.textContent = thisTrack;
      // p.id = thisTrack;

      // var img = document.createElement("img")
      // img.setAttribute("src", thisPic)

      // document.getElementById("lyrics").appendChild(p).style.opacity = 0;
      // document.getElementById("lyrics").appendChild(img);
      //document.getElementById("ghost").click();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });
  //return trackID;
}

// function getLyricsNow(trackId) {
//   //var trackId = document.getElementById("lyrics").textContent;
//   console.log(trackId);
//   $.ajax({
//     type: "GET",
//     data: {
//       apikey: "f2f5c2c5d02b5bca83ad9ae6342e9ce6",
//       track_id: trackId,
//       format: "jsonp",
//       callback: "jsonp_callback"
//     },
//     url: "https://api.musixmatch.com/ws/1.1/track.lyrics.get",
//     dataType: "jsonp",
//     jsonpCallback: 'jsonp_callback',
//     contentType: 'application/json',
//     success: function (data) {
//       console.log(data); console.log(data.message.body.lyrics.lyrics_body);
//       var lyricsBody = data.message.body.lyrics.lyrics_body.split(/\s+/).slice(0, 100).join(" ") + "...";

//       var j = document.createElement("p")
//       j.textContent = lyricsBody
//       document.getElementById("lyrics").appendChild(j)
//     },
//     error: function (jqXHR, textStatus, errorThrown) {
//       console.log(jqXHR);
//       console.log(textStatus);
//       console.log(errorThrown);
//     }
//   });
// };