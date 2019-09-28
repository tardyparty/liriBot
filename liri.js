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

            // display Name, Venue, Location, Date
            console.log("******* " + input + " *******");
            console.log("Venue: " + response.data[0].venue.name);
            console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country);
            console.log("Date: " + response.data[0].datetime);

            // write info to log.txt
            fs.appendFile("log.txt", "******* " + input + " *******", function(err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.appendFile("log.txt", "Venue: " + response.data[0].venue.name, function(err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.appendFile("log.txt", "Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country, function(err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.appendFile("log.txt", "Date: " + response.data[0].datetime, function(err) {
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

        // display song artist, name, link, album
        console.log("******* " + input + " *******");
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("View on Spotify: " + data.tracks.items[0].href);
        console.log("Album: " + data.tracks.items[0].album.name);

        // log info to log.txt 
        fs.appendFile("log.txt", "******* " + input + " *******", function(err) {
            if (err) {
                console.log(err);
            }
        });
        fs.appendFile("log.txt", "Artist: " + data.tracks.items[0].artists[0].name, function(err) {
            if (err) {
                console.log(err);
            }
        });
        fs.appendFile("log.txt", "Song: " + data.tracks.items[0].name, function(err) {
            if (err) {
                console.log(err);
            }
        });
        fs.appendFile("log.txt", "View on Spotify: " + data.tracks.items[0].href, function(err) {
            if (err) {
                console.log(err);
            }
        });
        fs.appendFile("log.txt", "Album: " + data.tracks.items[0].album.name, function(err) {
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

            // display movie info
            console.log("******* " + response.data.Title + " *******");
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);

            // log info to log.txt
            fs.appendFile("log.txt", "******* " + response.data.Title + " *******", function(err) {
                if(err) {
                    console.log(err);
                }
            });
            fs.appendFile("log.txt", "Title: " + response.data.Title, function(err) {
                if(err) {
                    console.log(err);
                }
            });
            fs.appendFile("log.txt", "Year: " + response.data.Year, function(err) {
                if(err) {
                    console.log(err);
                }
            });
            fs.appendFile("log.txt", "IMDB Rating: " + response.data.imdbRating, function(err) {
                if(err) {
                    console.log(err);
                }
            });
            fs.appendFile("log.txt", "Rotten Tomatoes: " + response.data.Ratings[1].Value, function(err) {
                if(err) {
                    console.log(err);
                }
            });
            fs.appendFile("log.txt", "Country: " + response.data.Country, function(err) {
                if(err) {
                    console.log(err);
                }
            });
            fs.appendFile("log.txt", "Language: " + response.data.Language, function(err) {
                if(err) {
                    console.log(err);
                }
            });
            fs.appendFile("log.txt", "Plot: " + response.data.Plot, function(err) {
                if(err) {
                    console.log(err);
                }
            });
            fs.appendFile("log.txt", "Actors: " + response.data.Actors, function(err) {
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