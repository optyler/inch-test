'use strict';

describe('Directive: units', function () {

  // load the directive's module
  beforeEach(module('inchTestApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<units></units>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the units directive');
  }));
});
