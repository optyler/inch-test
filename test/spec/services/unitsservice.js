'use strict';

describe('Service: unitsService', function () {

  // load the service's module
  beforeEach(module('inchTestApp'));

  // instantiate service
  var unitsService;
  beforeEach(inject(function (_unitsService_) {
    unitsService = _unitsService_;
  }));

  it('should do something', function () {
    expect(!!unitsService).toBe(true);
  });

});
