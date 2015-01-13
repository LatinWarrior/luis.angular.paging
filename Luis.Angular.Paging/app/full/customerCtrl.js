(function () {

    'use strict';

    angular
        .module('customerManagement')
        .controller('CustomerCtrl', ["$scope", 'customerService', CustomerCtrl]);

    //CustomerCtrl.$inject = ['$scope', 'customerService'];

    function CustomerCtrl($scope, customerService) {

        $scope.title = 'customer paging';
        $scope.description = 'Customers galore'; // 'A fully paged list of customers. The pager directive manages the page navigation. The customerService only loads a page when it clicked on for the first time';

        $scope.pages = customerService.pages;
        $scope.info = customerService.paging.info;
        $scope.options = customerService.paging.options;

        $scope.navigate = navigate;
        $scope.clear = optionsChanged;

        $scope.status = {
            type: "info",
            message: "ready",
            busy: false
        };

        activate();

        function activate() {
            //if this is the first activation of the controller load the first page
            if (customerService.paging.info.currentPage === 0) {
                navigate(1);
            }
        }

        function navigate(pageNumber) {

            $scope.status.busy = true;
            $scope.status.message = "loading records";

            customerService.navigate(pageNumber)
                .then(function() {
                    $scope.status.message = "ready";
                }, function(result) {
                    $scope.status.message = "something went wrong: " + (result.error || result.statusText);
                })
                ['finally'](function() {
                    $scope.status.busy = false;
                });
        }

        function optionsChanged() {
            customerService.clear();
            activate();
        }
    }
})();