'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('losungenApp'));

  var MainCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    MainCtrl = $controller('MainCtrl');
  }));

  describe('today', function () {
    it('check today', function () {
      expect(MainCtrl.date.getDate()).toBe(new Date().getDate());
      MainCtrl.onNext();
      expect(MainCtrl.date.getDate()).toBe(new Date().getDate()+1);
      MainCtrl.onPrevious();
      expect(MainCtrl.date.getDate()).toBe(new Date().getDate());
    });
  });
});
