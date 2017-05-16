(function() {
    'use strict';

    angular
        .module('app', [
            'ui.router', 'permission', 'nvd3',
            'triangular', 'LocalStorageModule',
            'ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngMaterial', 'as.sortable',
            'googlechart', 'chart.js', 'linkify', 'ui.calendar', 'angularMoment', 'textAngular', 'uiGmapgoogle-maps', 'hljs', 'md.data.table', angularDragula(angular), 'ngFileUpload', 'nvd3',
            'app.authentication', 'pusher-angular'

        ])

        // set a constant for the API we are connecting to
        //DEV 'url':  'http://localhost:8888/slim3-rest-master/public_html/',
        //PROD   'url':  'http://backend.webxperience.fr/',
        .constant('API_CONFIG', {
            'url':  'http://backend.webxperience.fr/',
            'prefetch_number' : 5
        });
})();
