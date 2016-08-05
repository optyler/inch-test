'use strict';

/**
 * @ngdoc service
 * @name inchTestApp.ticketService
 * @description
 * # ticketService
 * Service in the inchTestApp.
 */
angular.module('inchTestApp')
  .service('ticketService', ['$log', '$http', '$q', function ($log, $http, $q) {

    this.gatherAndProcess = function(servers) {

      // for the tickets, we just accumulate the values for similar keys.
      function success(responses) {

        return responses.reduce(function(prev, cur, index, array) {

          cur = cur.data;

          if (index === 0)
            return cur;

          for (var curKey in cur) {
            if (cur.hasOwnProperty(curKey) && prev.hasOwnProperty(curKey)) {
              prev[curKey] += cur[curKey];
            } else {
              prev[curKey] = cur[curKey];
            }
          }

          return prev;

        }, {});

      }

      function error(err) {
        $log.error('Something went wrong in ticketService', err);
        return err; // return err as it is a promise
      }

      var promises = servers.map(function(server) {
        return $http.get(server.server_url + '/tickets.json');
      });

      return $q.all(promises).then(success, error);
    };

  }]);
