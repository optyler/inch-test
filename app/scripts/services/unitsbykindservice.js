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

    // METHODS BEGINING WITH __ ARE NOT SUPPOSED TO BE USED OUTSIDE THE SERVICE EXCEPT IN TEST

    // test if the fragment follows the 'schema'
    this.__isValidFragment = function (fragment) {

      var ret = fragment !== null && typeof fragment === 'object';

      if (! ret)
        $log.warn('Ignoring the following fragment because it don\'t follows the json schema : ', fragment);

      return ret;
    };

    this.__accumulate = function(prev, cur) {
      for (var curKey in cur) {
        if (cur.hasOwnProperty(curKey) && prev.hasOwnProperty(curKey)) {
          prev[curKey] += cur[curKey];
        } else {
          prev[curKey] = cur[curKey];
        }
      }

      return prev;
    };

    // gather data from http endpoints and process it as follow :
    // accumulate all values for same keys
    this.gatherAndProcess = function(servers) {

      var that = this;

      // for the tickets, we just accumulate the values for similar keys.
      function process(responses) {

        return responses.reduce(function(prev, cur, index) {

          // cur is a promise, we only want the data
          cur = cur.data;

          // the first time, prev === {}
          if (index === 0)
            return cur;

          if ( ! that.__isValidFragment(cur) )
            return prev;

          return that.__accumulate(prev, cur);

        }, {});

      }

      function error(err) {
        $log.error('Something went wrong in unitsByKindService', err);
        return err; // return err as it is a promise
      }

      // All the requests to be made
      // TODO: if too many calls, should execute chunks of 10 or 15 requests at a time
      var promises = servers.map(function(server) {
        return $http.get(server.server_url + '/units_by_kind.json');
      });
      return $q.all(promises).then(process, error);
    };

  }]);
