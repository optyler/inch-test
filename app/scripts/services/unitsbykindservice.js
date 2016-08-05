'use strict';

/**
 * @ngdoc service
 * @name inchTestApp.unitsByKindService
 * @description
 * # unitsByKindService
 * Service in the inchTestApp.
 */
angular.module('inchTestApp')
  .service('unitsByKindService', ['$log', '$http', '$q', function ($log, $http, $q) {

    this.gatherAndProcess = function(servers) {

      // for the tickets, we just accumulate the values for similar keys.
      function success(responses) {

        return responses.reduce(function(prevVal, curVal, index, array) {
          curVal = curVal.data;

          for (var curValKey in curVal) {
            if (curVal.hasOwnProperty(curValKey) && prevVal.hasOwnProperty(curValKey)) {
              prevVal[curValKey] += curVal[curValKey];
            } else {
              prevVal[curValKey] = curVal[curValKey];
            }
          }

          return prevVal;

        }, {});

      }

      function error(err) {
        $log.error('Something went wrong in ticketService', err);
        return err; // return err as it is a promise
      }

      var promises = servers.map(function(server) {
        return $http.get(server.server_url + '/units_by_kind.json');
      });

      return $q.all(promises).then(success, error);
    };

  }]);
