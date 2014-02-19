'use strict';


// Declare app level module which depends on filters, and services
var riocognizedApp = angular.module('riocognizedApp', [
  'ngRoute',
  'riocognizedAppControllers'
]);
riocognizedApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/athletes', {templateUrl: 'partials/athletesList.html', controller: 'AthleteListCtrl'});
  $routeProvider.when('/athletes/:athleteId', {templateUrl: 'partials/athleteDetails.html', controller: 'AthleteDetailsCtrl'});
  $routeProvider.otherwise({redirectTo: '/athletes'});
}]);

riocognizedApp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);