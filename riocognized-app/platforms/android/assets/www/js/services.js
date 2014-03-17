'use strict';
angular.module('starter.services', [])

.factory('AthleteService', function($http) {
  var url = "http://olympic-insa.fr.nf:8083/api/athletes";
   
  return {
    all: function() {
      return $http.get(url);
    },
    get: function(athleteId) {
      url = url +"/"+athleteId.toString();
      return $http.get(url);
    }
  };
})

.factory('CameraService', function() {
    var deferred = $q.defer();
    return {
        takePicture: function(name) {
            navigator.camera.getPicture(
                    function(imageData) {
                        $scope.image.url = "http://olympic-insa.fr.nf:8083/image/download/28";//"data:image/jpeg;base64," + imageData;
                        deferred.resolve(imageData);
                    },
                    function(message) {
                        deferred.reject(message);
                    },
                    {quality: 50}
            );
            return deferred.promise;

        }
    };
});