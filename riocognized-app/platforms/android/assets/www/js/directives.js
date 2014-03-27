'use strict';
angular.module('starter.directives', [])
.directive('camera', function() {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, elm, attrs, ctrl) {
            elm.bind('click', function() {
                navigator.camera.getPicture(
                    function(imageURI) {
                        scope.$apply(function() {
                            scope.ctrl.$setViewValue(imageURI);
                            alert(imageURI);
                        });
                    },
                    function(err) {
                        ctrl.$setValidity('error', false);
                    }, {quality: 50, 
                        destinationType: Camera.DestinationType.FILE_URI});
            });
        }
    };
});
