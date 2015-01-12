(function () {

    "use strict";

    angular
        .module("common.services")
        .factory("customerResource",
        [
            "$resource",
            customerResource
        ]);

    function customerResource($resource) {
        return $resource("/api/customers/:customerId");
    }

}());