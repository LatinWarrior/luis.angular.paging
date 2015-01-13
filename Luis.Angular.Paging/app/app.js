(function() {

    'use strict';

    var app = angular.module('customerManagement', ['ngResource', 'ngRoute']);

    app.config([
        '$routeProvider', function($routeProvider) {

            $routeProvider.when('/fullPaging', {
                templateUrl: 'app/full/full.html',
                controller: 'CustomerCtrl',
                caseInsensitiveMatch: true
            });
            $routeProvider.otherwise({
                redirectTo: '/'
            });
        }
    ]);

    app.run([
        function() {
        }
    ]);

})();



//(function () {

//    "use strict";

//    var app = angular.module("customerManagement",
//    [
//        "common.services",
//        "ui.router",
//        "ui.mask",
//        "ui.bootstrap"
//        //"customerResourceMock"
//    ]);

//    app.config([
//            "$stateProvider",
//            "$urlRouterProvider",
//            function ($stateProvider, $urlRouterProvider) {

//                console.log("In app.js");

//                $urlRouterProvider.otherwise("/");

//                $stateProvider
//                    .state("home", {
//                        url: "/",
//                        templateUrl: "app/welcomeView.html"
//                    })
//                    // Customers
//                    .state("customerList", {
//                        url: "/api/customers",
//                        isArray: false,
//                        templateUrl: "app/full/full.html",
//                        controller: "CustomerCtrl as vm"
//                    });
//            }
//        ]
//    );

//})();