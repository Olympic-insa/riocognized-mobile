// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
'use strict';
angular.module('starter', ['ionic', 'starter.services', 'starter.controllers', 'starter.directives', 'starter.filters'])


        .config(function($stateProvider, $urlRouterProvider) {

            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js
            $stateProvider

                    // setup an abstract state for the tabs directive
                    .state('tab', {
                        url: "/tab",
                        abstract: true,
                        templateUrl: "templates/tabs.html"
                    })
                    // History tab
                    .state('tab.history', {
                        url: '/history',
                        views: {
                            'history-tab': {
                                templateUrl: 'templates/history.html',
                                controller: 'HistoryCtrl'
                            }
                        }
                    })
                    // RioHome tab
                    .state('tab.home', {
                        url: '/riohome',
                        views: {
                            'home-tab': {
                                templateUrl: 'templates/riohome.html',
                                controller: 'RioHomeCtrl'
                            }
                        }
                    })
                    // Picture tab
                    .state('tab.recognize', {
                        url: '/picturesrecognizer',
                        views: {
                            'recognize-tab': {
                                templateUrl: 'templates/picturesrecognizer.html',
                                controller: 'PicturesRecognizeCtrl'
                            }
                        }
                    })

                    .state('favorite', {
                        url: '/favorite',
                        templateUrl: 'templates/favorite.html',
                        controller: 'FavoriteCtrl'

                    })

                    .state('tab.about', {
                        url: '/about',
                        templateUrl: 'templates/about.html',
                        controller: 'AboutCtrl'

                    })

                    .state('athletes-index', {
                        url: '/athletes',
                        templateUrl: 'templates/athlete-index.html',
                        controller: 'AthleteIndexCtrl'
                    })

                    .state('parameters', {
                        url: '/parameters',
                        templateUrl: 'templates/parameters.html',
                        controller: 'ParametersCtrl'
                    })

                    .state('questionrecognize', {
                        url: '/questionrecognize',
                        templateUrl: 'templates/questionsrecognizer.html',
                        controller: 'QuestionsCtrl'
                    })

                    .state('athlete-detail', {
                        url: '/athlete/:athleteId',
                        templateUrl: 'templates/athlete-detail.html',
                        controller: 'AthleteDetailCtrl'
                    });

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/tab/riohome');

        });

