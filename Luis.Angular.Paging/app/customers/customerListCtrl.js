(function () {

    "use strict";

    angular
        .module("customerManagement")
        .controller("CustomerListCtrl",
                    ["customerResource",
                        CustomerListCtrl]);

    function CustomerListCtrl(customerResource) {

        var vm = this;

        vm.totalUsers = 0;
        vm.usersPerPage = 5;


        customerResource.query(function (data) {
            vm.customers = data;
        });

        vm.showImage = false;

        vm.toggleImage = function () {
            vm.showImage = !vm.showImage;
        }
    }
}());
