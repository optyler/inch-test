'use strict';

describe('Service: unitsByKindService', function () {

  // load the service's module
  beforeEach(module('inchTestApp'));

  // instantiate service
  var unitsByKindService;
  beforeEach(inject(function (_unitsByKindService_) {
    unitsByKindService = _unitsByKindService_;
  }));

  it('should exists', function() {
    expect(!!unitsByKindService).toBe(true);
  });

  describe('test "private" methods', function() {

    it('should detect bad inputs', function () {

      expect(unitsByKindService.__isValidFragment(undefined)).toBe(false);
      expect(unitsByKindService.__isValidFragment(null)).toBe(false);

    });

    it('should allows good inputs', function () {

      expect(unitsByKindService.__isValidFragment({})).toBe(true);

      var validData = { 'Apartment': 300, 'Garage': 50, 'Cellar': 60 };
      expect(unitsByKindService.__isValidFragment(validData)).toBe(true);

    });

    it('should compute correctly fragments', function() {
      var s1 = { 'Apartment': 300, 'Garage': 50, 'Cellar': 60 };
      var s2 = { 'Apartment': 150, 'Garage': 20, 'Ski Locker': 100 };
      var valid = { 'Apartment': 450, 'Garage': 70, 'Cellar': 60, 'Ski Locker': 100 };

      expect(unitsByKindService.__accumulate(s1, s2)).toEqual(valid);
    });
    
  });
  
});
