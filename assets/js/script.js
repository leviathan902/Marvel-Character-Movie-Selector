// Declare variables to access from HTML
var characters = $('#characters');
var charaInput = $('#chara');
var submitBtn = $('#submitBtn');
console.log(characters);

// Get value from drop-down list
characters.submit(function (event){
    event.preventDefault();

    var charaChoice = charaInput.val();

    console.log(charaInput.val());
    searchApi(charaChoice);
});

// Use that value to search for the character in the Marvel API
function searchApi(charaChoice) {
    var locQueryUrl = 'https://gateway.marvel.com:443/v1/public/characters?name=';

    locQueryUrl = locQueryUrl + charaChoice + '&ts=1&apikey=a37a09ef4c6e1092fd787cc4f25a802c&hash=26e79fcd0a3f7d62a4afad761c48c24a';
  
    fetch(locQueryUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
  
        return response.json();
      })
      .then(function (locRes) {
        // write query to page so user knows what they are viewing
        console.log(locRes.data.results[0]);
        // resultTextEl.textContent = locRes.search.query;
  
        // console.log(locRes);
  
        // if (!locRes.results.length) {
        //   console.log('No results found!');
        //   resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
        // } else {
        //   resultContentEl.textContent = '';
        //   for (var i = 0; i < locRes.results.length; i++) {
        //     printResults(locRes.results[i]);
        //   }
        // }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

// Put the information from the Marvel API onto screen


// Pull movies that character is in


// Use movies to search in Rotten Tomatoes API


// Display movies on screen