'use strict';

/**
 * @ngdoc directive
 * @name inchTestApp.directive:unitsByKind
 * @description
 * # unitsByKind
 */
angular.module('inchTestApp')
  .directive('unitsByKind', function () {
    return {
      template: '<div>units by kind</div>',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
