'use strict';

/**
 * @ngdoc service
 * @name inchTestApp.credentialService
 * @description
 * # credentialService retreive all the endpoints for which we have accesses
 * Service in the inchTestApp.
 */
angular.module('inchTestApp')
  .service('credentialService', ['$http', '$log', function ($http, $log) {

    // return a Promise with an array of credentials
    this.getCredentials = function() {

      function process(data) {
        $log.info('credential request gets', data);
        return data; // return data as it is a promise
      }

      function error(err) {
        $log.error('Something went wrong', err);
        return err; // return err as it is a promise
      }

      return $http.get('/mocks/credentials.json').then(process, error);

    };

  }]);
