(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('ForgotController', ForgotController);

    /* @ngInject */
    function ForgotController($scope, $state, $mdToast, $filter, $http, triSettings, API_CONFIG) {
        var vm = this;
        vm.triSettings = triSettings;
        vm.user = {
            email: ''
        };
        vm.resetClick = resetClick;

        ////////////////

        function resetClick() {
          console.log('click');
          $http.post(API_CONFIG.url+'Password', { email: vm.user.email})
              .success(function (response) {
                  if (response.state == 'ok') {
                    $mdToast.show(
                        $mdToast.simple()
                        .content($filter('triTranslate')('Your new password has been mailed'))
                        .position('bottom right')
                        .action($filter('triTranslate')('Login'))
                        .highlightAction(true)
                        .hideDelay(0)
                    ).then(function() {
                        $state.go('authentication.login');
                    });
                  } else {
                    $mdToast.show(
                        $mdToast.simple()
                        .content($filter('triTranslate')('This email does not exist on our plateform !'))
                        .position('bottom right')
                        .action($filter('triTranslate')('Login'))
                        .highlightAction(true)
                        .hideDelay(0)
                    );
                  }
              }).error(function (data){
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('triTranslate')('This email does not exist on our plateform'))
                    .position('bottom right')
                    .highlightAction(true)
                    .hideDelay(0)
                );
                console.log('erreur');
                //$state.go('triangular.dashboard-analytics');
              });



        }
    }
})();
