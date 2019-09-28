# **liriBot**

## Takes commands and inputs to search Spotify, OMDB, and Bands In Town 

Using the terminal, users can input one of four commands: 

* "concert-this"
    * Sends an API call to Bands in Town and returns: 
        * Artist Name
        * Venue
        * Location
        * Date
* "spotify-this-song"
    * Sends API call to Spotify and returns:
        * Artist
        * Song Name
        * Spotify Link
        * Album
* "movie-this"
    * Sends API call to OMDB and returns: 
        * Title
        * Year
        * IMDB Rating
        * Rotten Tomatoes
        * Country
        * Language
        * Plot
        * Actors
* "do-what-it-says" 
    * Reads command and input form random.txt and performs functions accordingly. Can only take one set of commands at a time / or the first commands in the file. 


## Coding Structure
    * Each command is presented as a case and has an accompanying function for each case.
    * Each of the funcitons handles everything from the API call to the output of data to console and log.txt

## Run()
### Requirements 
* NPM's 
    * dotenv
    * axios
    * fs
    * spotify

* API Keys
    * spotify
    * bandsintown
    * omdb

## Tools Used 
    * Node.js
    * Axios
    * FS

## My Role
Developed this application from beginning to end. 

## Demo

## Screenshots