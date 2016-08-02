'use strict';

/**
 * @ngdoc directive
 * @name inchTestApp.directive:units
 * @description
 * # units
 */
angular.module('inchTestApp')
  .directive('units', function () {
    return {
      scope : {
        servers : '='
      },
      template: '<div>units {{zboub}}</div>',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        scope.zboub = scope.servers.length;
      }
    };
  });
