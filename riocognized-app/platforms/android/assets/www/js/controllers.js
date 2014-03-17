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
    $http.get(url,{ cache: true}).success(function(data){
        $scope.athletes=data;  
    });
    
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
        });