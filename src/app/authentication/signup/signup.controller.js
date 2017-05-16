(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('SignupController', SignupController);

    /* @ngInject */
    function SignupController($state, $filter, $mdDialog, triSettings, $http, API_CONFIG, $cookies) {
        var vm = this;
        vm.triSettings = triSettings;
        vm.signupClick = signupClick;
        vm.user = {
            name: '',
            email: '',
            password: '',
            confirm: ''
        };

        ////////////////

        function signupClick() {
            $state.go('authentication.login');
        }
    }
})();
