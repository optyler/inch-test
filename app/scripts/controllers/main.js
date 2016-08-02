'use strict';

/**
 * @ngdoc function
 * @name inchTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inchTestApp
 */
angular.module('inchTestApp')
  .controller('MainCtrl', ['credentialService', '$scope', '$log', function (credentialService, $scope, $log) {

    $scope.servers = [];

    function displayServers(response) {    
      if (typeof response !== 'undefined' && Array.isArray(response.data)) {
        $scope.servers = response.data;
      }
    }
    credentialService.getCredentials().then(displayServers);

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
