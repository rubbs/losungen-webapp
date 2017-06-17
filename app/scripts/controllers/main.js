(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name losungenApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the losungenApp
   */
  var module = angular.module('losungenApp');
  module.controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$firebaseObject'];

  function MainCtrl($firebaseObject) {

    var vm = this;
    vm.onNext = loadNext;
    vm.onPrevious = loadPrevious;
    vm.onToday = activate;

    activate();

    /////////////

    function loadNext() {
      console.log('next');
      var d = new Date(vm.date);
      d.setDate(vm.date.getDate()+1);
      load(d);
    }

    function loadPrevious() {
      var d = new Date(vm.date);
      d.setDate(vm.date.getDate()-1);
      load(d);
    }

    function load(date){

      vm.load = true;

      var key = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0'+(date.getDate())).slice(-2);
      vm.date = date;
      var ref = firebase.database().ref().child('losungen').child(key);
      // download the data into a local object
      vm.data = $firebaseObject(ref);

      vm.data.$loaded().then(function(){
        console.log('loaded');
        vm.load = false;
      });

    }

    function activate() {
      console.log('activate');
      var today = new Date();
      load(today);
    }




    // putting a console.log here won't work, see below

  }
})();
