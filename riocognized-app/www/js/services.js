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
        })


        .factory('Camera', function($q, $window) {
            return {
                getPicture: function(onSuccess, onError, options) {
                        $window.navigator.camera.getPicture(onSuccess, onError, options);
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
        });