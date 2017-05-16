(function() {
    'use strict';

    angular
        .module('app')
        .run(runFunction);

    /* @ngInject */
    function runFunction($rootScope, $http, $state, $location, $q) {

       // keep user logged in after page refresh
      if (localStorage.cplan) {
           var data = JSON.parse(localStorage.cplan);
           $http.defaults.headers.common.Authorization = 'Bearer ' + data.currentUser.token;

       }
       // redirect to login page if not logged in and trying to access a restricted page
       $rootScope.$on('$locationChangeStart', function (event, next, current) {
           var publicPages = ['/login', '/forgot'];
           var restrictedPage = publicPages.indexOf($location.path()) === -1;
           if (restrictedPage && !localStorage.cplan) {
               $state.go('authentication.login');
           }
       });


        // default redirect if access is denied
        function redirectError(a,b,c,d,e) {
            $state.go('500');
        }

        // watches

        // redirect all errors to permissions to 500
        var errorHandle = $rootScope.$on('$stateChangeError', redirectError);

        // remove watch on destroy
        $rootScope.$on('$destroy', function() {
            errorHandle();
        });
    }
})();
