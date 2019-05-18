var dotEnv = require("dotenv").config();
var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);
var inquirer = require("inquirer");
var axios = require("axios");
function initialQuery() {
    inquirer.prompt([

        {
            type: "input",
            name: "userCommand",
            message: "please select an action. you may choose between:  `concert-this <artist/band name>, `spotify-this-song <song name>`, `movie-this <movie title>` and  `do-what-it-says`"
        }


    ]).then(function (query) {
        var userInput = query.userCommand.split(' ');
        var searchType = userInput[0];
        if (searchType == "concert-this") {
            concertThis(userInput);
        } else if (searchType == 'spotify-this-song') {
            spotifyThisSong(userInput);
        } else if (searchType == 'movie-this') {
            movieThis(userInput);
        } else if (searchType == 'do-what-it-says') {
            doWhatItSays(userInput);
        } else {
            console.log("invalid request. please choose between one of the four options.");
            initialQuery();
        }



        //geocoder.geocode(location.userInput, function(err, data) {

        //console.log(JSON.stringify(data, null, 2));
    });
}


function concertThis(query) {
    console.log(query);
    var searchTerm = "";
    for (var i=1; i<query.length; i ++){
        searchTerm += query[i]
        if (i < (query.length - 1)) {
            searchTerm += '+';
        }
    }
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
           
        }
    );
}
function spotifyThisSong(query) {
    console.log("spotify function running");
    console.log(query);
}
function movieThis(query) {
    console.log("movie function running");
    console.log(query);
}
function doWhatItSays(query) {
    console.log("dowhatitsays running");
    console.log(query);
}
initialQuery();