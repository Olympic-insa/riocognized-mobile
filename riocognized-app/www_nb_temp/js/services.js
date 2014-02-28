angular.module('starter.services', [])

.factory('AthleteService', function($http) {
  var url = "http://olympic-insa.fr.nf:8083/api/athletes";
   
  return {
    all: function() {
      return $http.get(url);
    },
    get: function(athleteId) {
      url = url +"/"+athleteId;
      return $http.get(url);
    }
  }
});