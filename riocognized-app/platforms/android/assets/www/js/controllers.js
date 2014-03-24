'use strict';
angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('PetIndexCtrl', function($scope, AthleteService) {
    AthleteService.all().success(function(athletes){
        $scope.athletes=athletes;
    });
})


// A simple controller that shows a tapped item's data
.controller('PetDetailCtrl', function($scope, $stateParams, AthleteService) {
    AthleteService.get($stateParams.athleteId).success(function(athlete){
        $scope.athlete=athlete;
    });
})

// A simple controller that fetches a list of data from a service
.controller('AthleteIndexCtrl',['$scope', '$http' ,function($scope,$http) {
    var url = "http://olympic-insa.fr.nf:8083/api/athletes";
    $http.get(url, { cache: true}).success(function(data){
        $scope.athleteslist = data;
        if (data.length > 2){
            $scope.athletes = data.slice(0,2);
        }else{
            $scope.athletes = data;
        }
    });
  
                $scope.loadMore = function() {
                    if (!$scope.athletes) {
                        alert("athletes is empty");
                    } else {
                        
                        var actualLength = $scope.athletes.length;
                        
                        var maxLength = $scope.athleteslist.length;
                        
                        alert(actualLength+"  "+maxLength);
                        var test = $scope.athleteslist;
                        if (maxLength - actualLength > 2) {
                            $scope.athletes = test.slice(0, actualLength+2);
                            var newLength = $scope.athletes.length;
                            alert(newLength);
                        } else {
                            $scope.athletes = $scope.athleteslist;
                        }
                    }
                    ;


                };
}])


// A simple controller that shows a tapped item's data
.controller('AthleteDetailCtrl', function($scope, $stateParams, $http) {
    var url = "http://olympic-insa.fr.nf:8083/api/athletes";
    url = url +"/"+$stateParams.athleteId.toString();
    $http.get(url).success(function(data){
        $scope.athlete=data;
    });
})

// A simple controller that shows a tapped item's data
        .controller('IdentifyCtrl', function($scope) {
            if (!navigator.camera) {
                alert("Camera API not supported", "Error");
                return;
            }
            // Take picture using device camera and retrieve image as base64-encoded string
            navigator.camera.getPicture(
                    
                    function(imageData) {
                        $scope.image.url= "http://olympic-insa.fr.nf:8083/image/download/28";//"data:image/jpeg;base64," + imageData;
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
            $scope.image.url= "data:image/jpeg;base64," + imageData;
        })

        .controller('MyCtrl1', function($scope) {
            $scope.myPictures = [];
            $scope.$watch('myPicture', function(value) {
                if (value) {
                    $scope.myPictures.push(value);
                }
            }, true);
        })
        
        .controller('MainController', function($rootScope, $scope, $http, $window, $document, $timeout) {
            $rootScope.counter = 1;
            var url = "http://olympic-insa.fr.nf:8083/api/athletes";
            $http.get(url, { cache: true}).success(function(data){
                $scope.athletes = data;
            });


            $scope.loadMoreItems = function() {
                alert("in loadMoreItems");
                $rootScope.counter += 1;
            };


            // Fix 'scroll' event not trigger issue
            $rootScope.resetCounter = function() {
                alert("in resetCounter");
                $rootScope.counter = 1;
                adjustCounter();
            };

            function adjustCounter() {
                alert("in adjustCounter");
                $timeout(function() {
                    if ($window.innerHeight > $document.find('body').outerHeight()) {
                        $rootScope.counter++;
                        adjustCounter();
                    }
                }, 200);
            }


            //$scope.$watch('predicate', function() {
            //    $rootScope.resetCounter();
            //});

            //$scope.$watch('reverse', function() {
            //    $rootScope.resetCounter();
            //});
        })
  



        .controller('DemoController', function($rootScope, $scope, $http,$window, $document, $timeout) {
            $rootScope.counter = 5;
            var url = "http://olympic-insa.fr.nf:8083/api/athletes";
            $http.get(url, { cache: true}).success(function(data){
                $scope.athletes = data;
                $scope.max = data.length;
            });

            $scope.loadMoreItems = function() {
                $rootScope.counter += 1;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            };
            
            $scope.hasMoreData = function() {
                if ($rootScope.counter >= $scope.max){
                    return false
                }else{
                    return true;
                }
            };

        })
        
        
        .filter('lazyLoad', function($rootScope) {
            
            return function(athletes) {
                if (athletes) {
                    
                    // set step to 2 to illustrate the scroll event problem
                    return athletes.slice(0, $rootScope.counter);
                }
                ;
            };

        });