(function() {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    /* @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, $httpProvider) {
        // Setup the apps routes

        // 404 & 500 pages
        $stateProvider
        .state('404', {
            url: '/404',
            views: {
                'root': {
                    templateUrl: '404.tmpl.html',
                    controller: 'ErrorPageController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('401', {
            url: '/401',
            views: {
                'root': {
                    templateUrl: '401.tmpl.html',
                    controller: 'ErrorPageController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('500', {
            url: '/500',
            views: {
                'root': {
                    templateUrl: '500.tmpl.html',
                    controller: 'ErrorPageController',
                    controllerAs: 'vm'
                }
            }
        });

        // set default routes when no path specified
        $urlRouterProvider.when('', '/login');
        $urlRouterProvider.when('/', '/login');

        // always goto 404 if route not found
        $urlRouterProvider.otherwise('/404');

        //Interceptors for http request
        $httpProvider.interceptors.push(function ($q) {
              return {
                  'response': function (response) {
                      return response;
                  },
                  'responseError': function (rejection) {
                      if(rejection.status === 401) {
                        if(rejection.statusText == "Expired"){
                          console.log('EXPIRED');
                            location = "/#/lock";
                        }else{
                          console.log('Unauthorized');
                            location = "/#/login";
                        }
                      }
                      return $q.reject(rejection);
                  }
              };
          });
    }
})();
