// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import "controllers"


// ----------------------------------------------------
// Note(lewagon): ABOVE IS RAILS DEFAULT CONFIGURATION
// WRITE YOUR OWN JS STARTING FROM HERE 👇
// ----------------------------------------------------

// External imports
import "bootstrap";
import algoliasearch from "algoliasearch";
import autocomplete from "autocomplete.js";

// Internal imports, e.g:
// import { initSelect2 } from '../components/init_select2';

document.addEventListener('turbolinks:load', () => {
  // Call your functions here, e.g:
  // initSelect2();
var client = algoliasearch('BA4HJTMZZL', 'e48d96f1f9ae255ccfaec1e8704eebad');
var index = client.initIndex('Pokemon');

function newHitsSource(index, params) {
    return function doSearch(query, cb) {
      index
        .search(query, params)
        .then(function(res) {
          cb(res.hits, res);
        })
        .catch(function(err) {
          console.error(err);
          cb([]);
        });
    };
  }

  autocomplete('#search-input', { hint: false }, [
    {
      source: newHitsSource(index, { hitsPerPage: 10 }),
      displayKey: 'name',
      templates: {
        suggestion: function(suggestion) {
            // Change the return here to whatever you wish to be displayed in the dropdown
            return `${suggestion._highlightResult.name.value} lives in ${suggestion._highlightResult.location.value} and uses ${suggestion._highlightResult.move.value}`;
        }
      }
    }
  ]).on('autocomplete:selected', function(event, suggestion, dataset, context) {
    console.log(event, suggestion, dataset, context);
  });
});


