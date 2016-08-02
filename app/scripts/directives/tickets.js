'use strict';

/**
 * @ngdoc directive
 * @name inchTestApp.directive:tickets
 * @description
 * # tickets
 */
angular.module('inchTestApp')
  .directive('tickets', function () {
    return {
      template: '<div>tickets</div>',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        scope.servers;
      }
    };
  });
