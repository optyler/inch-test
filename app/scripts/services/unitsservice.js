'use strict';

/**
 * @ngdoc service
 * @name inchTestApp.unitsService
 * @description
 * # unitsService
 * Service in the inchTestApp.
 */
angular.module('inchTestApp')
  .service('unitsService', ['$log', '$http', '$q', function ($log, $http, $q) {

    // test if the fragment follows the 'schema'
    function __isValidFragment(fragment) {

      var ret = typeof fragment !== 'undefined' &&
          fragment.hasOwnProperty('min') && Number.isFinite(fragment.min) &&
          fragment.hasOwnProperty('max') && Number.isFinite(fragment.max) &&
          fragment.hasOwnProperty('average') && Number.isFinite(fragment.average) &&
          fragment.hasOwnProperty('weight') && Number.isFinite(fragment.weight);

      if (! ret)
        $log.warn('Ignoring the following fragment because it don\'t follows the json schema : ', fragment);

      return ret;
    }

    function __processFragment(prev, cur) {

      if (typeof prev === 'undefined' && __isValidFragment(cur))
        return cur;

      if ( ! __isValidFragment(cur) )
        return prev;

      prev.min = Math.min(cur.min, prev.min);
      prev.max = Math.max(cur.max, prev.max);

      prev.average = (prev.weight * prev.average + cur.weight * cur.average) / (prev.weight + cur.weight);
      prev.weight += cur.weight;

      return prev;
    }

    this.gatherAndProcess = function(servers) {

      function success(responses) {

        return responses.reduce(function(prev, cur, index, array) {

          // the first time, prev === {}
          // cur is a promise, we only want the data
          cur = cur.data;

          if (index === 0)
            return cur;

          prev.total = __processFragment(prev.total, cur.total);
          prev.commonhold = __processFragment(prev.commonhold, cur.commonhold);

          return prev;

        }, {});
      }

      function error(err) {
        $log.error('Something went wrong in ticketService', err);
        return err; // return err as it is a promise
      }

      var promises = servers.map(function(server) {
        return $http.get(server.server_url + '/units.json');
      });

      return $q.all(promises).then(success, error);
    };

  }]);
