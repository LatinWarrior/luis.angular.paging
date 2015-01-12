(function() {

    "use strict";

    var app = angular.module("customerManagement",
    [
        "common.services",
        "ui.router",
        "ui.mask",
        "ui.bootstrap",
        "customerResourceMock"
    ]);

    app.config([
            "$stateProvider",
            "$urlRouterProvider",
            function ($stateProvider, $urlRouterProvider) {

                $urlRouterProvider.otherwise("/");

                $stateProvider
                    .state("home", {
                        url: "/",
                        templateUrl: "app/welcomeView.html"
                    })
                    // Customers
                    .state("customerList", {
                        url: "/api/customers",
                        templateUrl: "app/customers/customerListView.html",
                        controller: "CustomerListCtrl as vm"
                    });

            }
        ]
    );

})();