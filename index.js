function displayResults(responseJson) {
  console.log(responseJson);
  let breedPic = responseJson.message;
  $('.results').append(`<p>Here is a picture of the breed you were looking for:</p>`);
  $('.results').append(`<img src=${breedPic}>`);
  $('section').removeClass('hidden');
}

function fetchBreed(selectedBreed) {
  fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        $('.results').append(`<p class="error">Something went wrong! We couldn't get that breed.</p>
        <img src="https://images.unsplash.com/photo-1561733014-2c12d2d1f53b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80">`)
        throw new Error(response.statusText)
      }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => console.log(error))
    }

function getBreed() {
  let breedEntry = $('#breed').val().trim();
  let selectedBreedArray = [];
  let selectedBreed = "";
  let mainBreed = "";
  let subBreed = "";
  if (breedEntry.includes(" ")) {
    selectedBreedArray = breedEntry.split(" ");
    mainBreed = selectedBreedArray.pop();
    if (selectedBreedArray.length > 1) {
      subBreed = selectedBreedArray.join("");
    } else {
      subBreed = selectedBreedArray[0];
    }
    selectedBreed = `${mainBreed}/${subBreed}`;
  } else {
    selectedBreed = breedEntry;
  }
  fetchBreed(selectedBreed);
}
    






function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    $('.results').empty();
    getBreed();
  });
}

$(function() {
  console.log('Ready to fetch dogs!');
  watchForm();
});