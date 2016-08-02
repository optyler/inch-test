'use strict';

describe('Directive: unitsByKind', function () {

  // load the directive's module
  beforeEach(module('inchTestApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<units-by-kind></units-by-kind>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the unitsByKind directive');
  }));
});
