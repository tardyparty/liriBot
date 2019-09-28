// Requirements 
require('dotenv').config();
var axios = require('axios');
var fs = require('fs');
var Spotify = require('node-spotify-api');

// API Keys
var keys = require('./keys.js');

var spotifyKey = new Spotify(keys.spotify);
var omdbKey = keys.omdb.key;
var bandsKey = keys.bands.id;

// User Inputs
var command = process.argv[2];
var input = process.argv[3];


// Accept command and perform function
switch (command) {
    case "concert-this":
        concert();
        break;

    case "spotify-this-song":
        song();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        doIt();

}


// Look up a concert 
function concert() {

    // query url for api request
    var url = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=" + bandsKey;

    // API Call request
    axios
        .get(url)
        .then(function(response) {

            var result = "\n" + "******* " + input + " *******" + "\n" + "\n" +
                "Venue: " + response.data[0].venue.name + "\n" + 
                "Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country + "\n" + 
                "Date: " + response.data[0].datetime + "\n";

            // display Name, Venue, Location, Date
            console.log(console.log(result));

            // write info to log.txt
            fs.appendFile("log.txt", result, function(err) {
                if (err) {
                    console.log(err);
                }
            });
        })
        .catch(function(error){

            // make sure there are no errors
            if(error.response) {
                console.log(error.response);
            }

            else if (error.request) {
                console.log(error.request);
            }

            else {
                console.log("Error: ", error.message);
            }

            console.log(error.config);
        })

}


// Look up a song 
function song() {

    // search through spotify api
    spotifyKey.search({type: "track", query: input}, function(err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }

        var result = "\n" + "******* " + input + " *******" + "\n" + "\n" +
        "Artist: " + data.tracks.items[0].artists[0].name + "\n" + 
        "Song: " + data.tracks.items[0].name + "\n" + 
        "View on Spotify: " + data.tracks.items[0].href + "\n" + 
        "Album: " + data.tracks.items[0].album.name + "\n";

        // display song artist, name, link, album
        console.log(result);

        // log info to log.txt 
        fs.appendFile("log.txt", result, function(err) {
            if (err) {
                console.log(err);
            }
        });
    });
}


// Look up a movie 
function movie() {
    var url;

    if (input !== undefined) {
        var url = "http://www.omdbapi.com/?apikey=" + omdbKey + "&t=" + input;
    }
    else {
        var url = "http://www.omdbapi.com/?apikey=" + omdbKey + "&t=mr+nobody";
    }

    axios
        .get(url)
        .then(function(response) {

            var result = "\n" + "******* " + response.data.Title + " *******" + "\n" + "\n" +
            "Title: " + response.data.Title + "\n" +
            "Year: " + response.data.Year + "\n" +
            "IMDB Rating: " + response.data.imdbRating + "\n" + 
            "Rotten Tomatoes: " + response.data.Ratings[1].Value + "\n" + 
            "Country: " + response.data.Country + "\n" + 
            "Language: " + response.data.Language + "\n" + 
            "Plot: " + response.data.Plot + "\n" +
            "Actors: " + response.data.Actors + "\n";

            // display movie info
            console.log(result);

            // log info to log.txt
            fs.appendFile("log.txt", result, function(err) {
                if(err) {
                    console.log(err);
                }
            });
        })
        .catch(function(error) {

            // make sure there are no errors
            if(error.response) {
                console.log(error.response);
            }

            else if (error.request) {
                console.log(error.request);
            }

            else {
                console.log("Error: ", error.message);
            }

            console.log(error.config);
        })
    
}


// Idk what this does yet
function doIt() {

    // read instructions from random.txt 
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
            return console.log(error);
        }

        // split data into two indexes
        var dataArr = data.split(",");

        // assign data to original purposes
        command = dataArr[0];
        input = dataArr[1];

        // call song for new data
        switch (command) {
            case "concert-this":
                concert();
                break;
        
            case "spotify-this-song":
                song();
                break;
        
            case "movie-this":
                movie();
        }
    })
}