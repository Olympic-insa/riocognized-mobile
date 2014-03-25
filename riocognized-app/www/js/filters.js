'use strict';
angular.module('starter.filters', [])

        .filter('lazyLoad', function($rootScope) {

            return function(athletes) {
                if (athletes) {
                    return athletes.slice(0, $rootScope.counter);
                }
                ;
            };

        })
        
        .filter('anySearch', function() {
            return function(athletes, stringToSearch) {
                var athletesFiltered = new Array();
                if(!stringToSearch){return athletes;};
                if(!athletes){return athletesFiltered;};
                angular.forEach(athletes, function(athlete){
                    if ( athlete.name.toLowerCase().indexOf(stringToSearch.toLowerCase()) !== -1){
                        athletesFiltered.push(athlete);
                    }else if(athlete.surname.toLowerCase().indexOf(stringToSearch.toLowerCase()) !== -1){
                        athletesFiltered.push(athlete);
                    }else if( athlete.country.toLowerCase().indexOf(stringToSearch.toLowerCase()) !== -1){
                        athletesFiltered.push(athlete);
                    }else if(athlete.sport.toLowerCase().indexOf(stringToSearch.toLowerCase()) !== -1){
                        athletesFiltered.push(athlete);
                    }

                });
                return athletesFiltered;
               
            };

        });
