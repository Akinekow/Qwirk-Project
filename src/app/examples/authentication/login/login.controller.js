(function() {
    'use strict';

    angular
        .module('app.examples.authentication')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($state, $filter, $mdDialog, triSettings, $http, API_CONFIG) {
        var vm = this;
        vm.loginClick = loginClick;
        vm.triSettings = triSettings;
        // create blank user variable for login form
        vm.user = {
            email: '',
            password: ''
        };

        ////////////////

        function loginClick() {
          $http.post(API_CONFIG.url+'auth/login', { username: vm.user, password: vm.password })
              .success(function (response) {
                  // login successful if there's a token in the response
                  if (response.state == 'ok') {
                      // store username and token in local storage to keep user logged in between page refreshes
                      console.log(response);
                      //localStorage.currentUser = ;
                      localStorage.set("currentUser2", response.payload );

                      // add jwt token to auth header for all requests made by the $http service
                      $http.defaults.headers.common.Authorization = 'Bearer ' + response.payload.token;

                      //$state.go('triangular.dashboard-analytics');
                      // execute callback with true to indicate successful login
                  } else {
                    $mdDialog.show(
                          $mdDialog.alert()
                          .title($filter('triTranslate')('Unable to login'))
                          .textContent($filter('triTranslate')('Bad Username or Password'))
                          .ok('ok')
                      );
                  }
              }).error(function (data){
                console.log('erreur');
                //$state.go('triangular.dashboard-analytics');
              });



          //console.log('login');
            //$state.go('triangular.dashboard-analytics');
        }
    }
})();
