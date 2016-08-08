'use strict';

describe('Service: unitsService', function () {

  // load the service's module
  beforeEach(module('inchTestApp'));

  // instantiate service
  var unitsService;
  beforeEach(inject(function (_unitsService_) {
    unitsService = _unitsService_;
  }));

  it('should exists', function() {
    expect(!!unitsService).toBe(true);
  });

  describe('test "private" methods', function() {

    it('should detect bad inputs', function () {

      // a server could have no tickets
      expect(unitsService.__isValidFragment({})).toBe(false);
      expect(unitsService.__isValidFragment(undefined)).toBe(false);
      expect(unitsService.__isValidFragment(null)).toBe(false);

      var badDataKeyMissing = { 'min': 2, 'maaaaaax': 50, 'average': 33.5, 'weight': 300};
      expect(unitsService.__isValidFragment(badDataKeyMissing)).toBe(false);

      var badDataValueWrongType = { 'min': 'Z', 'max': 'SO', 'average': 'EE.S', 'weight': 'EOO'};
      expect(unitsService.__isValidFragment(badDataValueWrongType)).toBe(false);

      var badType = { 'min': '2', 'max': '50', 'average': '33.5', 'weight': '300'};
      expect(unitsService.__isValidFragment(badType)).toBe(false);

    });

    it('should allows good inputs', function () {

      var validData = { 'min': 2, 'max': 50, 'average': 33.5, 'weight': 300};
      expect(unitsService.__isValidFragment(validData)).toBe(true);

    });

    it('should compute correctly fragments', function() {
      var cur  =  { 'min': 1, 'max': 40, 'average': 31.5, 'weight': 200};
      var prev  = { 'min': 2, 'max': 50, 'average': 33.5, 'weight': 300};
      var valid = { 'min': 1, 'max': 50, 'average': 32.7, 'weight': 500};
      var bad   = {};

      expect(unitsService.__processFragment(prev, cur)).toEqual(valid);
      expect(unitsService.__processFragment(bad, cur)).toEqual(cur);
      expect(unitsService.__processFragment(prev, bad)).toEqual(prev);

    });

  });

});
