// Declare variables to access from HTML
var characters = $('#characters');
var charaInput = $('#chara');
var submitBtn = $('#submitBtn');
var charaInfoEl = $('#characterInfo');
var homeDescEl = $('.homeDesc');
var marvelImg = $('#marvelImg');
var nameTitle = $('#nameTitle');
var cardContent = $('#cardContent');

// Get value from drop-down list
characters.submit(function(event) {
    event.preventDefault();

    var charaChoice = charaInput.val();

    searchApi(charaChoice);
});

// Use that value to search for the character in the Marvel API
function searchApi(charaChoice) {
    var locQueryUrl = 'https://gateway.marvel.com:443/v1/public/characters?name=';

    locQueryUrl = locQueryUrl + charaChoice + '&ts=1&apikey=a37a09ef4c6e1092fd787cc4f25a802c&hash=26e79fcd0a3f7d62a4afad761c48c24a';

    fetch(locQueryUrl)
        .then(function(response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(displayInfo)
        .catch(function(error) {
            console.error(error);
        });
};

// Put information from API on screen
function displayInfo(locRes) {
    // Remove homepage description
    homeDescEl.remove();

    var results = locRes.data.results[0];
    console.log(results);
    marvelImg.html('<img src=' + results.thumbnail.path + '.' + results.thumbnail.extension + '></img>');
    nameTitle.text(results.name);
    cardContent.text(results.description);

    var comicsIntro = $('<h2>Comics ' + results.name + ' has appeared in:</h2>').css('font-weight','bold');
    cardContent.append(comicsIntro);
    var comics = results.series.items
    var comicsList = $('<ul></ul>');
    for (var i = 0; i < 6; i++) {
        var item = $('<li></li>');
        item.text(comics[i].name);
        comicsList.append(item);
    }
    cardContent.append(comicsList);
}

// Pull movies that character is in


// Use movies to search in Rotten Tomatoes API


// Display movies on screen

//This is Julios-Prototype - Connecting to OMDB web site and pulling movie information
// Out of the Movie object we want to extract, Movie Poster, Plot, Rating
// In the script you'll find my key - which is: 693e75d2

// var randomMovieArray =["Wolverine","Logan","X-Man","X2"]
var movie = "Wolverine";
console.log(movie)

function movieApiCall() {
    $.getJSON('http://www.omdbapi.com/?t=Wolverine&apikey=693e75d2').then(function(response) {
        console.log(response);
    })
}
movieApiCall();

// http: //www.omdbapi.com/?i=tt3896198&apikey=693e75d2