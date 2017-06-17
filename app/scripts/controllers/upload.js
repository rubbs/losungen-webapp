(function () {
  'use strict';

/**
 * @ngdoc function
 * @name losungenApp.controller:UploadCtrl
 * @description
 * # UploadCtrl
 * Controller of the losungenApp
 */
angular.module('losungenApp')
  .controller('UploadCtrl', UploadCtrl);


  UploadCtrl.$inject = [ '$firebaseObject', '$firebaseAuth'];

  function UploadCtrl($firebaseObject, $firebaseAuth) {
    console.log('about ctrl');

    var vm = this;

    vm.onProcess = processCsv;

    activate();
    /////////////

    function processCsv() {
      var arrayOfLines = vm.csv.match(/[^\r\n]+/g);

      for(var line in arrayOfLines){
        var actLine = arrayOfLines[line];


        // parse date
        var splitted = actLine.split('\t');

        var d = splitted[0];
        var dmy = d.split('.');
        var date = new Date(dmy[2], dmy[1] - 1, dmy[0]);

        var key = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0'+(date.getDate())).slice(-2);

//        var dayOfWeek = splitted[1];
        var sunday = splitted[2];
        var losungsvers = splitted[3];
        var losung = splitted[4];
        var lehrtextvers = splitted[5];
        var lehrtext = splitted[6];

        vm.losungen[key] = {
          'sonntag': sunday,
          'losungsvers': losungsvers,
          'losung': losung,
          'lehrtextvers': lehrtextvers,
          'lehrtext': lehrtext
        };

        console.log(splitted, vm.losungen[date]);
      }

      // save to firebase
      var obj = $firebaseObject(firebase.database().ref());
      obj.$loaded(function (data) {
        console.log('loaded root object', data);
        obj.losungen = vm.losungen;
        obj.$save().then(function (success) {
          console.log('losungen saved', success);
        });
      });
    }

    function activate() {
      vm.losungen = {};

      var auth = $firebaseAuth();

      // login with Facebook
      auth.$signInWithPopup('google').then(function(firebaseUser) {
        console.log('Signed in as:', firebaseUser);
      }).catch(function(error) {
        console.log('Authentication failed:', error);
      });
    }


  }
})();
