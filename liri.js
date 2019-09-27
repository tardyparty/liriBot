require("dontenv").config();

var keys = require("./keys.js");

var spotify = new spotify(keys.spotify);

var omdb = new omdb(keys.omdb);

var command = process.argv[2];
var request = process.argv[3];


// look up a concert with bands in town
if (command === "concert-this"){
    
}


// look up a song with spotify
if (command === "spotify-this-song"){

}


// look up a movie with omdb
if (command === "movie-this"){

}


// idk what this does yet
if (command === "do-what-it-says"){

}