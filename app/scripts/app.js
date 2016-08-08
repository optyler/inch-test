'use strict';

/**
 * @ngdoc overview
 * @name inchTestApp
 * @description
 * # inchTestApp
 *
 * Main module of the application.
 */
angular
  .module('inchTestApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
