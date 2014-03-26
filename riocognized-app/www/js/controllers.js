'use strict';
angular.module('starter.controllers', [])



// A simple controller that shows a tapped item's data
        .controller('AthleteDetailCtrl', function($scope, $stateParams, $http) {
            var url = "http://olympic-insa.fr.nf:8083/api/athletes";
            url = url + "/" + $stateParams.athleteId.toString();
            $http.get(url).success(function(data) {
                $scope.athlete = data;
            });
        })


// A controller that take a picture
        .controller('IdentifyCtrl', function($scope) {
            if (!navigator.camera) {
                alert("Camera API not supported", "Error");
                return;
            }
            // Take picture using device camera and retrieve image as base64-encoded string
            navigator.camera.getPicture(
                    function(imageData) {
                        $scope.image.url = "http://olympic-insa.fr.nf:8083/image/download/28";//"data:image/jpeg;base64," + imageData;
                        alert("blaba");
                    },
                    function(mesage) {
                        alert("Fail because : " + message);
                    },
                    {quality: 50});
        })

// A simple controller that shows a tapped item's data
        .controller('PictureCtrl', function($scope, CameraService) {
            if (!navigator.camera) {
                alert("Camera API not supported", "Error");
                return;
            }
            var imageData = CameraService.takePicture();
            $scope.image.url = "data:image/jpeg;base64," + imageData;
        })

        .controller('AthleteIndexCtrl', function($rootScope, $scope, $http) {
            $rootScope.counter = 1;
            $scope.searchMenuVisible = false;
            var url = "http://olympic-insa.fr.nf:8083/api/athletes";
            $http.get(url, {cache: true}).success(function(data) {
                $scope.athletes = data;
                $scope.max = data.length;
            });

            $scope.loadMoreItems = function() {
                $rootScope.counter += 1;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            };

            $scope.hasMoreData = function() {
                if ($rootScope.counter >= $scope.max) {
                    return false;
                } else {
                    return true;
                }
            };
            $scope.showSearchMenu = function() {
                $scope.searchMenuVisible = !$scope.searchMenuVisible;
            }

        })

        .controller('AboutCtrl', function($rootScope, $scope, $http) {
            $rootScope.counter = 1;
            $scope.searchMenuVisible = false;
            var url = "http://olympic-insa.fr.nf:8083/api/athletes";
            $http.get(url, {cache: true}).success(function(data) {
                $scope.athletes = data;
                $scope.max = data.length;
            });

            $scope.loadMoreItems = function() {
                $rootScope.counter += 1;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            };

            $scope.hasMoreData = function() {
                if ($rootScope.counter >= $scope.max) {
                    return false;
                } else {
                    return true;
                }
            };

            $scope.showSearchMenu = function() {
                $scope.searchMenuVisible = !$scope.searchMenuVisible;
                if ($scope.searchMenuVisible) {
                    $scope.hasSubSub.top = '137px';
                } else {
                    $scope.hasSubSub.top = '';
                }

            }

        });


