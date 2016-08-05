'use strict';

/**
 * @ngdoc function
 * @name inchTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inchTestApp
 */
angular.module('inchTestApp')
  .controller('MainCtrl',
    ['credentialService', 'ticketService', 'unitsService', 'unitsByKindService', '$scope', '$log',
    function (credentialService, ticketService, unitsService, unitsByKindService, $scope, $log) {
      
    function error(err) {
      $log.error('Something went wrong when trying to gather and process the data', err);
    }

    function getData(response) {
      if (typeof response !== 'undefined' && Array.isArray(response.data)) {
        $scope.servers = response.data;

        ticketService.gatherAndProcess(response.data).then(function(data) {
          $scope.tickets = data;
        }, error);
        unitsService.gatherAndProcess(response.data).then(function(data) {
          $scope.units = data;
        }, error);
        unitsByKindService.gatherAndProcess(response.data).then(function(data) {
          $scope.unitsByKind = data;
        }, error);

      }
    }

    credentialService.getCredentials().then(getData);

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
      
  }]);
