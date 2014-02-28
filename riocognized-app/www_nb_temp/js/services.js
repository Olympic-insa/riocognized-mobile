angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('PetService', function($http) {
   var athletes;
  // Might use a resource here that returns a JSON array
  $http({method: 'GET', url: 'http://olympic-insa.fr.nf:8083/api/athletes'}).
  success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      athletes = data;
  }).
  error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
        // Some fake testing data
    athletes = [
      { id: 0, title: 'Cats', description: 'Furry little creatures. Obsessed with plotting assassination, but never following through on it.' },
      { id: 1, title: 'Dogs', description: 'Lovable. Loyal almost to a fault. Smarter than they let on.' },
      { id: 2, title: 'Turtles', description: 'Everyone likes turtles.' },
      { id: 3, title: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' }
    ];
  });


  return {
    all: function() {
      return athletes;
    },
    get: function(athleteId) {
      // Simple index lookup
      return athletes[athleteId];
    }
  }
});
