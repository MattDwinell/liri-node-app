require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var inquirer = require("inquirer");
var axios = require("axios");
var searchTerm = "";
var fs = require("fs");
function initialQuery() {
    searchTerm = "";
    inquirer.prompt([

        {
            type: "input",
            name: "userCommand",
            message: "please select an action. you may choose between:  `concert-this <artist/band name>, `spotify-this-song <song name>`, `movie-this <movie title>` and  `do-what-it-says`"
        }


    ]).then(function (query) {
        var userInput = query.userCommand.split(' ');
        var searchType = userInput[0];
        for (var i=1; i<userInput.length; i ++){
            searchTerm += userInput[i]
            if (i < (userInput.length - 1)) {
                searchTerm += '+';
            }
        }
        if (searchType == "concert-this") {
           
            concertThis(searchTerm);
        } else if (searchType == 'spotify-this-song') {
            if (searchTerm == ""){
                searchTerm += "the+sign";
            }
            spotifyThisSong(searchTerm);
        } else if (searchType == 'movie-this') {
            if (searchTerm == ""){
                searchTerm += "the+godfather";
            }
            movieThis(searchTerm);
        } else if (searchType == 'do-what-it-says') {
            doWhatItSays(searchTerm);
        } else {
            console.log("invalid request. please choose between one of the four options.");
            initialQuery();
        }




    });
}


function concertThis(query) {
    console.log(query);
    
   
    var queryUrl = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";
    console.log(queryUrl);
    

    axios.get(queryUrl).then(
        function (response) {
            console.log(response);
            for (var i=0; i<response.data.length; i ++){
                console.log("venue: " + response.data[i].venue.name + ", " + response.data[i].venue.country);
                console.log("date of concert: " + response.data[i].datetime);
                console.log("full lineup: " + response.data[i].lineup);
                console.log("description: " + response.data[i].description);
                console.log("------------------");

            }
            initialQuery();
           
        }
    )
    .catch(function (error) {
        console.log(error);
    })
}
function spotifyThisSong(query) {
    console.log("spotify function running");
    console.log(query);
    spotify.search({ type: 'track', query: query }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log("searching....");
      console.log("---------");
      console.log("artist: " + data.tracks.items[0].artists[0].name);
      console.log("song title: " + data.tracks.items[0].name);
      console.log("preview link: " + data.tracks.items[0].preview_url);
      console.log("album: " + data.tracks.items[0].album.name);
      initialQuery();
      });

}
function movieThis(query) {
    console.log("movie function running");
    console.log(query);
    var queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + query;
    console.log(queryUrl);
    axios.get(queryUrl).then(
        function (response) {
            console.log(response.data);
            console.log("title: " + response.data.Title );
            console.log("Release Year: " + response.data.Released );
            console.log("IMDB Rating: " + response.data.Ratings[0].Value );
            console.log("Rotten Tomatoes Rating: " +response.data.Ratings[1].Value );
            console.log("Country of Production: " + response.data.Country );
            console.log("Language: " + response.data.Language );
            console.log("plot: " + response.data.Plot );
            console.log("Actors: " + response.data.Actors );
            initialQuery();
           
        }
    )
    .catch(function (error) {
        console.log(error);
    })
}
function doWhatItSays(query) {
    console.log("dowhatitsays running");
    console.log(query);
    fs.readFile('./random.txt', 'utf-8', (err, data) => {
        if (err) throw err;
        
        var query = data.split(',')
       
        var queryPlus = query[1];
        var searchQuery = queryPlus.split(" ").join("+");
        
        spotify.search({ type: 'track', query: searchQuery }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
          console.log("searching....");
          console.log("---------");
          console.log("artist: " + data.tracks.items[0].artists[0].name);
          console.log("song title: " + data.tracks.items[0].name);
          console.log("preview link: " + data.tracks.items[0].preview_url);
          console.log("album: " + data.tracks.items[0].album.name);
          initialQuery();
          });
      });
}
initialQuery();