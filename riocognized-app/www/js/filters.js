'use strict';
angular.module('starter.filters', [])

        .filter('lazyLoad', function($rootScope) {

            return function(athletes) {
                if (athletes) {
                    return athletes.slice(0, $rootScope.counter);
                }
                ;
            };

        });
