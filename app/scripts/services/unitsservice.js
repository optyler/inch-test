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

    // METHODS BEGINING WITH __ ARE NOT SUPPOSED TO BE USED OUTSIDE THE SERVICE EXCEPT IN TEST

    // test if the fragment follows the 'schema'
    this.__isValidFragment = function(fragment) {

      var ret = fragment !== null && typeof fragment !== 'undefined' &&
          fragment.hasOwnProperty('min') && typeof fragment.min === 'number' &&
          fragment.hasOwnProperty('max') && typeof fragment.max  === 'number' &&
          fragment.hasOwnProperty('average') && typeof fragment.average === 'number' &&
          fragment.hasOwnProperty('weight') && typeof fragment.weight === 'number';

      if (! ret)
        $log.warn('Ignoring the following fragment because it don\'t follows the json schema : ', fragment);

      return ret;
    };

    this.__processFragment = function(prev, cur) {

      var that = this;

      if (! that.__isValidFragment(prev) && that.__isValidFragment(cur))
        return cur;

      if ( ! that.__isValidFragment(cur) )
        return prev;

      prev.min = Math.min(cur.min, prev.min);
      prev.max = Math.max(cur.max, prev.max);

      prev.average = (prev.weight * prev.average + cur.weight * cur.average) / (prev.weight + cur.weight);
      prev.weight += cur.weight;

      return prev;
    };

    this.gatherAndProcess = function(servers) {

      var that = this;

      function process(responses) {

        return responses.reduce(function(prev, cur, index) {

          // cur is a promise, we only want the data
          cur = cur.data;

          // the first time, prev === {}
          if (index === 0)
            return cur;

          prev.total = that.__processFragment(prev.total, cur.total);
          prev.commonhold = that.__processFragment(prev.commonhold, cur.commonhold);

          return prev;

        }, {});
      }

      function error(err) {
        $log.error('Something went wrong in unitsService', err);
        return err; // return err as it is a promise
      }

      // All the requests to be made
      // TODO: if too many calls, should execute chunks of 10 or 15 requests at a time
      var promises = servers.map(function(server) {
        return $http.get(server.server_url + '/units.json');
      });
      return $q.all(promises).then(process, error);
    };

  }]);
