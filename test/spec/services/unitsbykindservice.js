'use strict';

describe('Service: unitsByKindService', function () {

  // load the service's module
  beforeEach(module('inchTestApp'));

  // instantiate service
  var unitsByKindService;
  beforeEach(inject(function (_unitsByKindService_) {
    unitsByKindService = _unitsByKindService_;
  }));

  it('should do something', function () {
    expect(!!unitsByKindService).toBe(true);
  });

});
