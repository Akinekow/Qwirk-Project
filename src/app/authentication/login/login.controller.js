(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($state, $filter, $mdDialog, triSettings, $http, API_CONFIG, $cookies) {
        var vm = this;
        vm.loginClick = loginClick;
        vm.triSettings = triSettings;

        vm.user = {
            username: '',
            password: '',
            remember_me: false
        };
        vm.loading = false;

        ////////////////

        function loginClick() {
            vm.loading = true;
        }

    }
})();
