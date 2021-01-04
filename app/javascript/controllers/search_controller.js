import { Controller } from "stimulus"
import algoliasearch from "algoliasearch";
import autocomplete from "autocomplete.js";

export default class extends Controller {
  static targets = [ ]

  connect() {
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
  }
}
