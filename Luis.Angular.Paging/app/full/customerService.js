(function () {
    'use strict';

    angular
        .module('customerManagement')
        .factory('customerService', customerService);

    customerService.$inject = ['$http', '$q', 'customerClientService'];

    function customerService($http, $q, customerClientService) {
        var initialOptions = {
            size: 100,
            orderBy: "name"
        },
        service = {
            initialize: initialize,
            navigate: navigate,
            clear: clear,
            pages: [],
            paging: {
                options: angular.copy(initialOptions),
                info: {
                    totalItems: 0,
                    totalPages: 1,
                    currentPage: 0,
                    sortableProperties: [
                    "firstName",
                    "lastName"
                    ]
                }
            }
        };

        return service;

        function initialize() {
            var queryArgs = {
                pageSize: service.paging.options.size,
                pageNumber: service.paging.info.currentPage
            };

            service.paging.info.currentPage = 1;

            return customerClientService.query(queryArgs).$promise.then(

                function (result) {
                    var newPage = {
                        number: pageNumber,
                        customers: []
                    };

                    console.log(result);

                    result.customers.forEach(function (customer) {
                        newPage.customers.push(customer);
                    });

                    service.pages.push(newPage);
                    service.paging.info.currentPage = 1;
                    service.paging.info.totalPages = result.totalPages;

                    return result.$promise;
                }, function (result) {
                    return $q.reject(result);
                });
        }

        function navigate(pageNumber) {
            var dfd = $q.defer();

            if (pageNumber > service.paging.info.totalPages) {
                return dfd.reject({ error: "page number out of range" });
            }

            if (service.pages[pageNumber]) {
                service.paging.info.currentPage = pageNumber;
                dfd.resolve();
            } else {
                return load(pageNumber);
            }

            return dfd.promise;
        }

        function load(pageNumber) {
            var queryArgs = {
                pageSize: service.paging.options.size,
                pageNumber: pageNumber,
                orderBy: service.paging.options.orderBy
            };

            return customerClientService.query(queryArgs).$promise.then(

                function (result) {
                    var newPage = {
                        number: service.paging.info.pageNumber,
                        customers: []
                    };

                    console.log(result);

                    result.customers.forEach(function (customer) {
                        newPage.customers.push(customer);
                    });

                    service.pages[pageNumber] = newPage;
                    service.paging.info.currentPage = pageNumber;
                    service.paging.info.totalPages = result.totalPages;
                    service.paging.info.totalItems = result.totalItems;

                    return result.$promise;
                }, function (result) {
                    return $q.reject(result);
                });
        }

        function clear() {
            service.pages.length = 0;
            service.paging.info.totalItems = 0;
            service.paging.info.currentPage = 0;
            service.paging.info.totalPages = 1;
        }
    }
})();