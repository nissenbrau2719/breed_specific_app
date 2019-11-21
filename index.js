function getBreed() {
  let selectedBreed = $('#breeds').val();
  fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert("Sorry, we can't get that breed at this time"));
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('.results').empty();
  let breedPic = responseJson.message;
  $('.results').append(`<p>Here is a picture of the breed you were looking for:</p>`);
  $('.results').append(`<img src=${breedPic}>`);
  $('section').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getBreed();
  });
}

function getBreedOptions() {
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(responseJson => populateBreeds(responseJson))
    .catch(error => alert('Cannot access breed list right now'))
}

function populateBreeds(responseJson) {
  let breeds = Object.keys(responseJson.message);
  for (let breed of breeds) {
   $('select').append(`<option value="${breed}">${breed}</option>`)
  }
}

$(function() {
  console.log('Ready to fetch dogs!');
  watchForm();
  getBreedOptions();
});