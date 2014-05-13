'use strict';
// Fallback for desktop testings
var Camera = Camera || {
    PictureSourceType: {
        PHOTOLIBRARY: 0,
        CAMERA: 1,
        SAVEDPHOTOALBUM: 2
    },
    DestinationType: {
        DATA_URL: 0,
        FILE_URI: 1,
        NATIVE_URI: 2
    },
    EncodingType: {
        JPEG: 0,
        PNG: 1
    },
    MediaType: {
        PICTURE: 0,
        VIDEO: 1,
        ALLMEDIA: 2
    },
    Direction: {
        BACK: 0,
        FRONT: 1
    }
};

angular.module('starter.services', [])


        .factory('Camera', function($q, $window) {
            return {
                getPicture: function() {
                    var deferred = $q.defer();
                    $window.navigator.camera.getPicture(
                            //OnSuccess
                                    function(image) {
                                        deferred.resolve(image);
                                    }, function(error) {
                                deferred.reject(error);
                            },
                                    {
                                        destinationType: Camera.DestinationType.DATA_URL,
                                        sourceType: Camera.PictureSourceType.CAMERA,
                                        encodingType: Camera.EncodingType.JPEG,
                                        quality: 20
                                    }
                            );
                            return deferred.promise;
                        },
                cleanup: function(onSuccess, onError) {
                    $window.navigator.camera.cleanup(onSuccess, onError);
                },
                PictureSourceType: Camera.PictureSourceType,
                DestinationType: Camera.DestinationType,
                EncodingType: Camera.EncodingType,
                MediaType: Camera.MediaType,
                Direction: Camera.Direction
            };
        })
                .factory('Recognition', function($q, $http) {
                    return {
                        upload: function(image) {
                            var deferred = $q.defer();

                            $http({
                                url: 'http://olympic-insa.fr.nf:8083/recognition/api/upload',
                                method: "POST",
                                data: "{\"name\": \"Name\",\"description\": \"metadata string\",\"content\": \"" + image + "\",\"contentType\": \"image/jpeg\"}"
                            })
                                    .success(function(data) {
                                        deferred.resolve(data);
                                    })
                                    .error(function(data) {
                                        deferred.reject(data);
                                    });
                            return deferred.promise;
                        },
                        recognize: function(url) {
                            var deferred = $q.defer();
                            $http.get("http://lynxlabs.fr.nf:8083/recognition/api/recognize?url="+url)
                                    .success(function(response) {
                                        deferred.resolve(response);
                                    })
                                    .error(function(error) {
                                        deferred.reject(error);
                                    });
                            return deferred.promise;
                        }
                    };

                })
                .factory('Athlete', function() {
                    var Athlete = {};
                    return {
                        getAthlete: function() {
                            return Athlete;
                        },
                        setAthlete: function(athlete) {
                            Athlete = athlete;
                            return;
                        }
                    };
                })
                .factory('Athletes', function() {
                    var Athletes = {};
                    return {
                        getAthletes: function() {
                            return Athletes;
                        },
                        setAthletes: function(athletes) {
                            Athletes = athletes;
                            return;
                        }
                    }
                })
                .factory('Geolocation', function($rootScope) {
                    return {
                        /**
                         * Plugin Get from https://github.com/xelita/angular-cordova-geolocation
                         * 
                         * Check the geolocation plugin availability.
                         * @returns {boolean}
                         */
                        checkGeolocationAvailability: function() {
                            //$log.debug('starter.services.Geolocation.checkGeolocationAvailability.');
                            if (!navigator.geolocation) {
                                //$log.warn('Geolocation API is not available.');
                                return false;
                            }
                            return true;
                        },
                        /**
                         * Returns the device's current position to the geolocationSuccess callback with a Position object as the parameter.
                         * For more information: https://github.com/apache/cordova-plugin-geolocation/blob/master/doc/index.md#navigatorgeolocationgetcurrentposition
                         */
                        getCurrentPosition: function(successCallback, errorCallback, options) {
                            //$log.debug('starter.services.Geolocation.getCurrentPosition.');
                            // Checking API availability
                            if (!this.checkGeolocationAvailability()) {
                                return;
                            }

                            // API call
                            navigator.geolocation.getCurrentPosition(
                                    function(position) {
                                        $rootScope.$apply(successCallback(position));
                                    },
                                    function(error) {
                                        $rootScope.$apply(errorCallback(error));
                                    },
                                    options
                                    );
                        },
                        /**
                         * Returns the device's current position when a change in position is detected.
                         * For more information: https://github.com/apache/cordova-plugin-geolocation/blob/master/doc/index.md#navigatorgeolocationwatchposition
                         */
                        watchPosition: function(successCallback, errorCallback, options) {
                            //$log.debug('cordovaGeolocationService.watchPosition.');

                            // Checking API availability
                            if (!this.checkGeolocationAvailability()) {
                                return;
                            }

                            // API call
                            return navigator.geolocation.watchPosition(
                                    function(position) {
                                        $rootScope.$apply(successCallback(position));
                                    },
                                    function(error) {
                                        $rootScope.$apply(errorCallback(error));
                                    },
                                    options
                                    );
                        },
                        /**
                         * Stop watching for changes to the device's location referenced by the watchID parameter.
                         * For more information: https://github.com/apache/cordova-plugin-geolocation/blob/master/doc/index.md#navigatorgeolocationclearwatch
                         */
                        clearWatch: function(watchID) {
                            //$log.debug('cordovaGeolocationService.clearWatch.');

                            // Checking API availability
                            if (!this.checkGeolocationAvailability()) {
                                return;
                            }

                            // API call
                            navigator.geolocation.clearWatch(watchID);
                        }
                    };
                });