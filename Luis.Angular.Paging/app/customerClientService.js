(function() {

    'use strict';

    angular
        .module('customerManagement')
        .factory('customerClientService', function($resource) {
            return $resource("api/customers/:customerId",
            { customerId: "@customerId" },
            {
                'query': {
                    method: 'GET',
                    url: '/api/customers?'
                    //params: { pageNo: '@pageNo', pageSize: '@pageSize', orderBy: '@orderBy' }
                }
            });
        });
})();
