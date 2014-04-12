'use strict';
angular.module('starter.controllers', [])

        .controller('ContentController', function($scope, $ionicSideMenuDelegate) {
            $scope.toggleLeft = function() {
                $ionicSideMenuDelegate.toggleLeft();
            };
            $scope.toggleRight = function() {
                $ionicSideMenuDelegate.toggleRight();
            };
        })

        .controller('HistoryCtrl', function($scope) {
            //TODO
        })

        .controller('RioHomeCtrl', function($scope) {
            //TODO
        })

        .controller('QuestionsCtrl', function($scope) {
            //TODO
        })

        .controller('ParametersCtrl', function($scope) {
            //TODO
        })

        .controller('AboutCtrl', function($scope) {
            //TODO
        })

        .controller('FavoriteCtrl', function($scope) {
            //TODO
        })

        .controller('PicturesRecognizeCtrl', function($scope, Camera, $http) {
            Camera.getPicture(function(image) {
                $scope.$apply(function() {
                    $scope.imageData = "data:image/jpeg;base64," + image;
                });
                //envoyer image
                $http({
                    url: 'http://olympic-insa.fr.nf:8083/image/api/upload',
                    method: "POST",
                    data: "{\"name\": \"Name\",\"description\": \"metadata string\",\"content\": \"" + image + "\",\"contentType\": \"image/jpeg\"}"
                })
                        .then(function(data, status, headers, config) {
                            // success
                            alert(JSON.stringify(data, null, 4));
                        },
                                function(data, status, headers, config) { // optional
                                    // failed
                                    alert(JSON.stringify(data, null, 4));
                                }
                        );
            }, function(error) {
                $scope.$apply(function() {
                    $scope.error = error;
                });
            }, {
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                encodingType: Camera.EncodingType.JPEG,
                quality: 20
            });
        })



// A simple controller that shows a tapped item's data
        .controller('AthleteDetailCtrl', function($scope, $stateParams, $http) {
            var url = "http://olympic-insa.fr.nf:8085/api/athletes";
            url = url + "/" + $stateParams.athleteId.toString();
            $http.get(url).success(function(data) {
                $scope.athlete = data;
            });
            $scope.showMenuButton = false;
        })

        .controller('AthleteIndexCtrl', function($rootScope, $scope, $http, $ionicModal) {
            $rootScope.counter = 1;
            $scope.searchMenuVisible = false;
            $scope.search = {};
            var url = "http://olympic-insa.fr.nf:8085/api/athletes";
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
            };
            $ionicModal.fromTemplateUrl('templates/modal-list-country.html', function(modal) {
                $scope.modalCountry = modal;
            }, {
                scope: $scope,
                animation: 'slide-in-up',
                focusFirstInput: true
            });
            $ionicModal.fromTemplateUrl('templates/modal-list-sport.html', function(modal) {
                $scope.modalSport = modal;
            }, {
                scope: $scope,
                animation: 'slide-in-up',
                focusFirstInput: true
            });
        })

        .controller('ModalCtrlCountry', function($scope, $http) {
            $http.get('http://olympic-insa.fr.nf:8083/api/countries').success(function(data) {
                $scope.countries = data;
            });
            $scope.chooseCountry = function(count) {

                $scope.search.country = count;
                $scope.modalCountry.hide();
            };
        })

        .controller('ModalCtrlSport', function($scope, $http) {
            $http.get('http://olympic-insa.fr.nf:8083/api/sports').success(function(data) {
                $scope.sports = data;
            });
            $scope.chooseSport = function(count) {

                $scope.search.sport = count;
                $scope.modalSport.hide();
            };
        });


