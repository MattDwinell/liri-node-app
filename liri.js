 var dotEnv = require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var inquirer = require("inquirer");

inquirer.prompt([

    {
      type: "input",
      name: "userCommand",
      message: "please select an action. you may choose between:  `concert-this <artist/band name>, `spotify-this-song <song name>`, `movie-this <movie title>` and  `do-what-it-says`"
    }
  
  // After the prompt, store the user's response in a variable called location.
  ]).then(function(query) {
  console.log(query.userCommand);
    // console.log(location.userInput);
  
    // Then use the Google Geocoder to Geocode the address
    //geocoder.geocode(location.userInput, function(err, data) {
  
      //console.log(JSON.stringify(data, null, 2));
    });
  

  function concertThis(query){
      console.log("concert functioning");
  }
  function spotifyThisSong(query){
      console.log("spotify function running");
  }
  function movieThis(query){
      console.log("movie function running");
  }
  function doWhatItSays(query){
      console.log("dowhatitsays running");
  }