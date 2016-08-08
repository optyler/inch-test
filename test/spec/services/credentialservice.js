'use strict';

describe('Service: credentialService', function () {

  // load the service's module
  beforeEach(module('inchTestApp'));

  // instantiate service
  var credentialService;
  beforeEach(inject(function (_credentialService_) {
    credentialService = _credentialService_;
  }));

  it('should initialize the service correctly the service', function () {
    expect(!!credentialService).toBe(true);
    expect(credentialService.getCredentials).toBeDefined();
  });

  it('should return a promise with an array of 3 items', function() {
    credentialService.getCredentials();
  });

});
