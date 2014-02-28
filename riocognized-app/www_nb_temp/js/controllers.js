angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('PetIndexCtrl', function($scope, AthleteService) {
    AthleteService.all().success(function(athletes){
        $scope.athletes=athletes;
    });
})


// A simple controller that shows a tapped item's data
.controller('PetDetailCtrl', function($scope, $stateParams, AthleteService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.athlete = AthleteService.get($stateParams.athleteId);
});
