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

        .controller('RioHomeCtrl', function($rootScope, $scope, Reader, $ionicPlatform) {
            $rootScope.history = [];
            $ionicPlatform.ready(function() {
                Reader.getJSON();
            });

        })

        .controller('QuestionsCtrl', function($rootScope, $scope, $http, $ionicModal, $window, $location, Geolocation, Athlete, Athletes, Writer) {
            $scope.search = {};
            // we will store our form data in this object
            $scope.form = {};
            $scope.currentPosition = null;
            $scope.sportSelected = false;
            $scope.countrySelected = false;
            $scope.pronom = {};
            $scope.pronom.perso = "he/she";
            $scope.pronom.posse = "his/her";
            $scope.menOrWomen = function(value) {
                if (value == "M") {
                    $scope.pronom.perso = "he";
                    $scope.pronom.posse = "his";
                } else if (value == "F") {
                    $scope.pronom.perso = "she";
                    $scope.pronom.posse = "her";
                }
            };
            $scope.showBibQuestion = function(value) {
                if (value != "") {
                    $scope.sportSelected = true;
                } else {
                    $scope.sportSelected = false;
                }
            };
            $scope.showSuitQuestion = function(value) {
                if (value != "") {
                    $scope.countrySelected = true;
                } else {
                    $scope.countrySelected = false;
                }
            };
            $ionicModal.fromTemplateUrl('templates/modal-list-sport.html', function(modal) {
                $scope.modalSport = modal;
            }, {
                scope: $scope,
                animation: 'slide-in-up'
            });
            $ionicModal.fromTemplateUrl('templates/modal-list-country.html', function(modal) {
                $scope.modalCountry = modal;
            }, {
                scope: $scope,
                animation: 'slide-in-up'
            });
            $scope.reset = function() {
                $scope.form.gender = null;
                $scope.form.racing = null;
                $scope.search.sport = null;
                $scope.form.bib = null;
                $scope.search.country = null;
                $scope.form.race_suit = null;
                $scope.form.skin_color = null;
                $scope.form.hair_length = null;
                $scope.form.hair_color = null;
                $scope.form.fit = null;
                $scope.form.heigth = null;
                $scope.stopWatchingPosition();
            };
            $scope.getCurrentPosition = function() {
                Geolocation.getCurrentPosition(successHandler);
            };
            $scope.startWatchingPosition = function() {
                $scope.watchId = Geolocation.watchPosition(successHandler);
            };
            $scope.stopWatchingPosition = function() {
                Geolocation.clearWatch($scope.watchId);
                $scope.watchId = null;
                $scope.currentPosition = null;
            };
            // Handlers

            var successHandler = function(position) {
                $scope.currentPosition = position;
            };
            $scope.startWatchingPosition();
            $scope.recognize = function() {
                var url = "http://olympic-insa.fr.nf:8083/api/athletes";
                url = url + "?gender=" + $scope.form.gender;
                url = url + "&racing=" + $scope.form.racing;
                if ($scope.currentPosition != null && $scope.form.racing == "true") {
                    //alert($scope.currentPosition.toSource());
                    //console.log($scope.currentPosition);
                    url = url + "&gps=" + $scope.currentPosition.coords.latitude + "," + $scope.currentPosition.coords.longitude;
                }
                ;
                if ($scope.search.sport != null) {
                    url = url + "&sport=" + $scope.search.sport;
                }
                ;
                if ($scope.form.bib != null) {
                    url = url + "&bib=" + $scope.form.bib;
                }
                ;
                if ($scope.search.country != null) {
                    url = url + "&country=" + $scope.search.country;
                }
                ;
                if ($scope.form.race_suit != null) {
                    url = url + "&race_suit=" + $scope.form.race_suit.toLowerCase();
                }
                ;
                if ($scope.form.skin_color != null) {
                    url = url + "&skin_color=" + $scope.form.skin_color.toLowerCase();
                }
                ;
                if ($scope.form.hair_length != null) {
                    url = url + "&hair_length=" + $scope.form.hair_length;
                }
                ;
                if ($scope.form.hair_color != null) {
                    url = url + "&hair_color=" + $scope.form.hair_color.toLowerCase();
                }
                ;
                if ($scope.form.fit != null) {

                    url = url + "&fit=" + $scope.form.fit;
                }
                ;
                if ($scope.form.heigth != null) {

                    url = url + "&heigth=" + $scope.form.heigth;
                }
                ;
                $http.get(url)
                        .success(function(data) {
                            if (data.length == 1) {
                                Athlete.setAthlete(data[0]);

                                $rootScope.history.push(data[0]);
                                Writer.writeJSON($rootScope.history);

                                $scope.reset();
                                //change view to athlete result
                                $location.url("/athleteresult");
                            } else {
                                Athletes.setAthletes(data);
                                $scope.reset();
                                $location.url("/athletesresult");
                            }
                        })
                        .error(function(data, status) {
                            if (data.message == "ATHLETE_NOT_FOUND") {
                                // Try again
                                alert("Athlete not found, try again!");
                                //$scope.reset();
                                //$window.location.reload();
                            } else if (data.message == "TOO_MANY_RESULTS") {
                                // Let's try some new questions
                                alert("Too many athletes were found please try to add more details");
                            }

                        });
            };
        })

        .controller('ParametersCtrl', function($scope) {
            //TODO
        })

        .controller('AboutCtrl', function($rootScope, $scope, $ionicModal, $timeout, Reader, Writer) {
        })

        .controller('FavoriteCtrl', function($scope) {
            //TODO

        })

        .controller('PicturesRecognizeCtrl', function($rootScope, $scope, $q, $ionicModal, $timeout, $location, Athlete, Camera, Recognition, Writer) {
            $ionicModal.fromTemplateUrl('templates/modal-advert.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
            });
            $scope.openModal = function() {
                $scope.modal.show();
            };
            $scope.closeModal = function() {
                $scope.modal.hide();
            };
            //Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function() {
                $scope.modal.remove();
            });

            $scope.takePicture = function() {
                Camera.getPicture().then(function(image) {
                    //After taking a picture open Advertissement
                    $scope.openModal();
                    //
                    $q.all([
                        Recognition.upload(image),
                        $timeout(function() {
                            $scope.closeModal();
                        }, 5000)
                    ]).then(function(data) {
                        Athlete.setAthlete(data[0][0].athlete);
                        $rootScope.history.push(data[0][0].athlete);
                        Writer.writeJSON($rootScope.history);
                        $location.url("/athleteresult");
                    }, function(reason) {
                        if (reason.message == "INVALID_OR_EMPTY_CONTENT") {
                            alert("No Athlete recognized, try again!");
                        } else {
                            alert("Check your internet connexion and try again!");
                        }
                        $scope.takePicture();
                    });
                    // Angular promise
                    $scope.imageData = "data:image/jpeg;base64," + image;

                }, function(reason) {
                    if (reason == "Camera cancelled.") {
                        $location.url("/riohome");
                    } else {
                        alert(JSON.stringify(reason, null, 4));
                    }
                    ;
                });
            };
            $scope.takePicture();
            //envoyer image
//                $http({
//                    url: 'http://olympic-insa.fr.nf:8083/image/api/upload',
//                    method: "POST",
//                    data: "{\"name\": \"Name\",\"description\": \"metadata string\",\"content\": \"" + image + "\",\"contentType\": \"image/jpeg\"}"
//                })
//                        .success(function(data) {
//                            deferred.resolve(data);
//                            alert(JSON.stringify(data, null, 4));
//                        })
//                        .error(function(data) {
//                            deferred.reject();
//                            alert(JSON.stringify(data, null, 4));
//                        });
//                        .then(function(data, status, headers, config) {
//                            // success
//                            
//                            alert(JSON.stringify(data, null, 4));
//                        },
//                                function(data, status, headers, config) { // optional
//                                    // failed
//                                    alert(JSON.stringify(data, null, 4));
//                                }
//                        );

        })



// A simple controller that shows a tapped item's data
        .controller('AthleteResultCtrl', function($scope, Athlete) {
            $scope.athlete = Athlete.getAthlete();
        })
        .controller('AthletesResultCtrl', function($scope, Athletes, Athlete, $location) {
            $scope.athletes = Athletes.getAthletes();
            $scope.athleteView = function(athlete) {
                Athlete.setAthlete(athlete);
                $location.url("/athleteresult");
            };
        })
        .controller('AthleteDetailCtrl', function($scope, $stateParams, $http) {
            var url = "http://olympic-insa.fr.nf:8083/api/athletes";
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
            var url = "http://olympic-insa.fr.nf:8083/api/athletes";
            $http.get(url, {cache: true}).success(function(data) {
                $scope.athletes = data;
                $scope.max = data.length;
                if (data.length >= 10) {
                    $rootScope.counter = 10;
                } else {
                    $rootScope.counter = data.length;
                }
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
                animation: 'slide-in-up'

            });
            $scope.openModalCountry = function() {
                $scope.modalCountry.show();
            };
            $scope.closeModalCountry = function() {
                $scope.modalCountry.hide();
            };
            //Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function() {
                $scope.modalCountry.remove();
            });

            $ionicModal.fromTemplateUrl('templates/modal-list-sport.html', function(modal) {
                $scope.modalSport = modal;
            }, {
                scope: $scope,
                animation: 'slide-in-up',
                focusFirstInput: true
            });
            $scope.openModalSport = function() {
                $scope.modalSport.show();
            };
            $scope.closeModalSport = function() {
                $scope.modalSport.hide();
            };
            //Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function() {
                $scope.modalSport.remove();
            });
        })

        .controller('ModalCtrlCountry', function($scope, $http) {
            $http.get('http://olympic-insa.fr.nf:8083/api/countries').success(function(data) {
                $scope.countries = data;
            });
            $scope.chooseCountry = function(count) {

                $scope.search.country = count;
                $scope.countrySelected = true;
                $scope.modalCountry.hide();
            };
        })



        .controller('ModalCtrlSport', function($scope, $http) {
            $http.get('http://olympic-insa.fr.nf:8083/api/sports').success(function(data) {
                $scope.sports = data;
            });
            $scope.chooseSport = function(count) {

                $scope.search.sport = count;
                $scope.sportSelected = true;
                $scope.modalSport.hide();
            };
        });


