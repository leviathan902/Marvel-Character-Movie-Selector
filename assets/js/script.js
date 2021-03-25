// Declare variables to access from HTML
var characters = $('#characters');
var charaInput = $('#chara');
var homeDescEl = $('.homeDesc');
var marvelImg = $('#marvelImg');
var nameTitle = $('#nameTitle');
var cardContent = $('#cardContent');
var movieCard = $('#movieCardContent');
var posterImg = $('#posterImg');

// Get value from drop-down list
characters.submit(function(event) {
    event.preventDefault();

    var charaChoice = charaInput.val();

    if (charaChoice === 'wolverine') {
        document.body.style.backgroundImage = "url(assets/images/Wolverine.jpg)"
    }
    else if (charaChoice === 'thanos') {
        document.body.style.backgroundImage = "url(assets/images/Thanos.jpg)"
    }
    else if (charaChoice === 'iron%20man') {
        document.body.style.backgroundImage = "url(assets/images/IronMan.jpg)"
    }
    else if (charaChoice === 'hulk') {
        document.body.style.backgroundImage = "url(assets/images/hulk.jpg)"
    }
    else if (charaChoice === 'black%20widow') {
        document.body.style.backgroundImage = "url(assets/images/Black-Widow-Avengers.jpg)"
    }
    else if (charaChoice === 'gamora') {
        document.body.style.backgroundImage = "url(assets/images/Gamora-2.jpg)"
    }
    else {
        
    }

    searchMarvel(charaChoice);
    searchOMDB(charaChoice);
});

// Use that value to search for the character in the Marvel API
function searchMarvel(charaChoice) {
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
    marvelImg.html('<img src=' + results.thumbnail.path + '.' + results.thumbnail.extension + '></img>');
    nameTitle.text(results.name);
    cardContent.text(results.description);

    var comicsIntro = $('<h5>Comics ' + results.name + ' has appeared in:</h5>');
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

// Connecting to OMDB web site and pulling movie information - worked from Julio's Prototype
// Out of the Movie object we want to extract, Movie Poster, Plot, Rating

function searchOMDB(charaChoice) {

    if (charaChoice === 'wolverine') {
        movieName = 'the%20wolverine'
    } else if (charaChoice === 'thanos') {
        movieName = 'Avengers%20Infinity%20War'
    } else if (charaChoice === 'iron%20man') {
        movieName = 'Iron%20Man'
    } else if (charaChoice === 'hulk') {
        movieName = 'The%20Incredible%20Hulk'
    } else if (charaChoice === 'black%20widow') {
        movieName = 'The%20Avengers'
    } else if (charaChoice === 'gamora') {
        movieName = 'guardians%20of%20the%20galaxy'
    } else {

    }

    var locQueryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&apikey=693e75d2';

    $.getJSON(locQueryUrl)
    .then(function(response) {
        var movieInfo = response;
        addContent(movieInfo);
    })
}

function addContent(movieInfo) {
    console.log(movieInfo);
    posterImg.html('<img src=' + movieInfo.Poster + '></img>')
    var movieIntro = $('<h5>Most well known for being in this movie:</h5>');
    movieCard.html(movieIntro);
    var movieTitle = $('<p>' + movieInfo.Title + '</p>').addClass('movieTitle');
    movieCard.append(movieTitle);
    var moviePlot = $('<br><p>' + movieInfo.Plot + '</p>');
    movieCard.append(moviePlot);
    var movieRatingTitles = $('<br><p></p>');
    movieRatingTitles.text(movieInfo.Ratings[0].Source + " " + movieInfo.Ratings[1].Source + " " + movieInfo.Ratings[2].Source);
    movieCard.append(movieRatingTitles);
    var movieRatings = $('<p></p>');
    movieRatings.text(movieInfo.Ratings[0].Value + " " + movieInfo.Ratings[1].Value + " " + movieInfo.Ratings[2].Value).addClass('ratingNumbers');
    movieCard.append(movieRatings);
}