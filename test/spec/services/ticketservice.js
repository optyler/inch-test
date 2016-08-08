'use strict';

describe('Service: ticketService', function () {

  // load the service's module
  beforeEach(module('inchTestApp'));

  // instantiate service
  var ticketService;
  beforeEach(inject(function (_ticketService_) {
    ticketService = _ticketService_;
  }));

  it('should exists', function () {
    expect(!!ticketService).toBe(true);
  });

  describe('test "private" methods', function() {

    it('should detect bad inputs', function () {

      expect(ticketService.__isValidFragment(undefined)).toBe(false);
      expect(ticketService.__isValidFragment(null)).toBe(false);

    });

    it('should allows good inputs', function () {

      // a ticket can be empty
      expect(ticketService.__isValidFragment({})).toBe(true);

      var validData = {'2016-07-01': 10, '2016-07-03': 5, '2016-07-05': 6 };
      expect(ticketService.__isValidFragment(validData)).toBe(true);

    });

  });

  it('should compute correctly fragments', function() {
    var s1 = {'2016-07-01': 10, '2016-07-03': 5, '2016-07-05': 6};
    var s2 = {'2016-07-01': 5, '2016-07-02': 5, '2016-07-07': 6};
    var valid = {'2016-07-01': 15, '2016-07-02': 5, '2016-07-03': 5, '2016-07-05': 6, '2016-07-07': 6};

    expect(ticketService.__accumulate(s1, s2)).toEqual(valid);
  });


});
