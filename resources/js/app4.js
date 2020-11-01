
window.$ = require('jquery');

function autocomplete() {

  (function() {



    var places = require('places.js');
    var placesAutocomplete = places({
      appId: 'pl3L0GWSSXDR',
      apiKey: '2e3513be338d19d42a81830c543b4aa8',
      container: document.querySelector('#edit_address'),
      templates: {
        value: function(suggestion) {
          return suggestion.name;
        }
      }
    }).configure({
      type: 'address'
    });
    placesAutocomplete.on('change', function resultSelected(e) {
      console.log(e);
      document.querySelector('#edit_state').value = e.suggestion.country || '';
      document.querySelector('#edit_city').value = e.suggestion.city || '';
      document.querySelector('#edit_zipcode').value = e.suggestion.postcode || '';
      // document.querySelector('#create_zipcode').value = e.suggestion.postcode || '';
      document.querySelector('#edit_lat').value = e.suggestion.latlng.lat || '';
      document.querySelector('#edit_lng').value = e.suggestion.latlng.lng || '';
      document.querySelector('#edit_address').value = e.suggestion.name || '';
    });
  })();
  var target = $('span.algolia-places');
  target.addClass('prova');
}

function init() {
  console.log('init');
  autocomplete();
}

$(document).ready(init)
