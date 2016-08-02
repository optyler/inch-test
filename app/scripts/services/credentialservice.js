'use strict';

/**
 * @ngdoc service
 * @name inchTestApp.credentialService
 * @description
 * # credentialService
 * Service in the inchTestApp.
 */
angular.module('inchTestApp')
  .service('credentialService', ['$http', '$log', function ($http, $log) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var credentials = []; // contains all servers credentials
    this.getCredentials = function() {

      function success(data) {
        $log.info('credential request gets', data);
        return data; // return data as it is a promise
      }

      function error(err) { 
        $log.error('Something went wrong', err);
        return err; // return err as it is a promise
      }

      return $http.get('/mocks/credentials.json').then(success, error)

    };
  }]);
