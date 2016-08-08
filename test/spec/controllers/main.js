'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('inchTestApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of credentials to the scope', function () {
    // expect(MainCtrl.servers.length).toBe(3); // 3 servers mocked
  });
});
