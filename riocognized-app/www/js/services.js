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
                            $http.get("http://lynxlabs.fr.nf:8083/recognition/api/recognize?url=" + url)
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
                    };
                })
                .factory('Reader', function($rootScope) {

                    function gotFS(fileSystem) {
                        fileSystem.root.getFile("history.json", {create: true, exclusive: false}, gotFileEntry, fail);
                    }

                    function gotFileEntry(fileEntry) {
                        fileEntry.file(gotFile, fail);
                    }

                    function gotFile(file) {
                        readAsText(file);
                    }


                    function readAsText(file) {
                        var reader = new FileReader();
                        reader.onloadend = function(evt) {
                            $rootScope.history = JSON.parse(evt.target.result);
                        };
                        reader.readAsText(file);
                    }

                    function fail(evt) {
                        alert("Fail " + evt.target.error.code);
                    }


                    return {
                        getJSON: function() {
                            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
                            return;
                        }
                    };
                })
                .factory('Writer', function() {
                    var JsonToWrite = "{[]}";

                    function gotFS(fileSystem) {
                        fileSystem.root.getFile("history.json", {create: true, exclusive: false}, gotFileEntry, fail);
                    }

                    function gotFileEntry(fileEntry) {
                        fileEntry.createWriter(gotFileWriter, fail);
                    }

                    function gotFileWriter(writer) {

                        writer.write(JsonToWrite);
                    }

                    function fail(error) {
                        alert("Can't write " + error.code);
                    }
                    return {
                        writeJSON: function(jsonToWrite) {
                            JsonToWrite = JSON.stringify(jsonToWrite);
                            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
                            return;
                        }
                    };
                })
                .factory('Favorite', function($rootScope) {
                    var JsonToWrite = "{[]}";


                    function gotFSread(fileSystem) {
                        fileSystem.root.getFile("favorites.json", {create: true, exclusive: false}, gotFileEntryread, fail);
                    }

                    function gotFileEntryread(fileEntry) {
                        fileEntry.file(gotFile, fail);
                    }

                    function gotFile(file) {
                        readAsText(file);
                    }


                    function readAsText(file) {
                        var reader = new FileReader();
                        reader.onloadend = function(evt) {
                            $rootScope.favorites = JSON.parse(evt.target.result);
                        };
                        reader.readAsText(file);
                    }

                    function fail(evt) {
                        alert("Fail " + evt.target.error.code);
                    }

                    function gotFSwrite(fileSystem) {
                        fileSystem.root.getFile("favorites.json", {create: true, exclusive: false}, gotFileEntrywrite, fail);
                    }

                    function gotFileEntrywrite(fileEntry) {
                        fileEntry.createWriter(gotFileWriter, fail);
                    }

                    function gotFileWriter(writer) {

                        writer.write(JsonToWrite);
                    }


                    return {
                        checkFavorite: function(id) {
                            alert("checkFavorite");
                            var lengthFavorites = $rootScope.favorites.length;
                            alert("length : "+$rootScope.favorites.length);
                            alert(JSON.stringify($rootScope.favorites, null, 4));
                            for (var i = 0; i < lengthFavorites; i++) {
                                if ($rootScope.favorites[i].id == id) {
                                    return true;
                                }
                            }
                        },
                        getJSON: function() {
                            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSread, fail);
                            return;
                        },
                        writeJSON: function(jsonToWrite) {
                            JsonToWrite = JSON.stringify(jsonToWrite);
                            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSwrite, fail);
                            return;
                        }
                    };
                }
                )
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