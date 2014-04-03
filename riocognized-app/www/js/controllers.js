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

        .controller('IdentifyCtrl2', function($scope, Camera, $http) {
            Camera.getPicture(function(image) {
                $scope.$apply(function() {
                    $scope.imageData = "data:image/jpeg;base64," + image;
                });
                //envoyer image
                //$http.post('http://olympic-insa.fr.nf:8083/image/api/upload',"{data:image/jpeg;base64," + image+"}").success();
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
        .controller('PictureCtrl', function($scope, CameraService) {
            if (!navigator.camera) {
                alert("Camera API not supported", "Error");
                return;
            }
            var imageData = CameraService.takePicture();
            $scope.image.url = "data:image/jpeg;base64," + imageData;
        })

        .controller('MyCtrl1', function($scope) {

            $scope.myPictures = [];
            $scope.$watch('myPicture', function(value) {
                alert($scope.myPicture);
                if (value) {
                    $scope.myPictures.push(value);
                }
            }, true);
        })

        .controller('AthleteIndexCtrl', function($rootScope, $scope, $http, $ionicModal) {
            $rootScope.counter = 1;
            $scope.searchMenuVisible = false;
            $scope.search = {};
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


