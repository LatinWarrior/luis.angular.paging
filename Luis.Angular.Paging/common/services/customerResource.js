(function() {

    "use strict";

    angular
        .module("common.services")
        .factory("customerResource",
        [
            "$resource",
            customerResource
        ]);

    function customerResource($resource) {
        return $resource("/api/customers/:customerId", 
            {CustomerId: "@CustomerId"},
        {
            'query': {
                method: 'GET',
                isArray: true,
                url: '/api/customers/:pageNo/:pageSize',
                params: {
                    pageNo: '@pageNo',
                    pageSize: '@pageSize'
                }
            }
        });
    }

    //function customerResource($http) {

    //    var vm = this;

    //    vm.customers = [];
    //    vm.totalCustomers = 0;
    //    vm.pageSize = 25;
    //    getResults();

    //    vm.pagination = {
    //        current: 1
    //    };

    //    vm.pageChanged = function(pageNo, pageSize) {
    //        getResults(pageNo, pageSize);
    //    }

    //    function getResults(pageNo, pageSize) {

    //        pageNo = 2;
    //        pageSize = 10;

    //        var result = $http.get('/api/customers?pageNo=' + pageNo + '&pageSize=' + pageSize)
    //            .then(function(results) {
    //            vm.customers = results.data.items;
    //            vm.totalRecordCount = results.data.totalRecordCount;
    //            vm.pageCount = results.data.pageCount;
    //            vm.pageSize = results.data.pageSize;
    //            vm.pageNo = results.pageNo;
    //            });

    //        console.log("result: " + result);

    //        return result;
    //    }

    //    //return $resource("/api/customers/:customerId",
    //    //{ id: "@id" },
    //    //{
    //    //    'query': {
    //    //        method: 'GET',
    //    //        url: '/api/customers/:pageSize/:pageNumber/:orderBy',
    //    //        params: { pageSize: '@pageSize', pageNumber: '@pageNumber', orderBy: '@orderBy' },
    //    //        isArray: false
    //    //    }
    //    //});
    //}

    

}());