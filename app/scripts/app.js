'use strict';

/**
 * @ngdoc overview
 * @name losungenApp
 * @description
 * # losungenApp
 *
 * Main module of the application.
 */
angular
  .module('losungenApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/upload', {
        templateUrl: 'views/upload.html',
        controller: 'UploadCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });

    // Initialize Firebase
    var config = {
      apiKey: 'AIzaSyA6w-C-4QKWb4hN84h-0cn4Jp3yWEy5tpY',
      authDomain: 'losungen-a80b7.firebaseapp.com',
      databaseURL: 'https://losungen-a80b7.firebaseio.com',
      storageBucket: 'losungen-a80b7.appspot.com',
      messagingSenderId: '299829452121'
    };
    firebase.initializeApp(config);
  });
