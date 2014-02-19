'use strict';

/* Controllers */

var riocognizedAppControllers = angular.module('riocognizedAppControllers', []);
 
riocognizedAppControllers.factory('AthletesData', function($http){
    var athletesData;
    $http.get('data/data.json').success(function(data) {
      athletesData = data;
    });
    return athletesData;
});
 
riocognizedAppControllers.controller('AthleteListCtrl', ['$scope', '$http',
  function ($scope, $http) {
      $http.get('data/data.json').success(function(data) {
      $scope.athletes = data;
    });
    
    $scope.orderProp = 'age';
  }]);
 
riocognizedAppControllers.controller('AthleteDetailsCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $scope.athleteid = $routeParams.athleteId;
    $http.get('data/data.json').success(function(data) {
        for (var i=0;i<data.length;i++){
            if(data[i].id==$scope.athleteid){
                $scope.athlete=data[i];
                break;
            }
        }
    });

    
    
  }]);