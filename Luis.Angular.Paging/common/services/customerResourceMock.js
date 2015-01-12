(function () {

    "use strict";

    var app = angular
        .module("customerResourceMock",
        ["ngMockE2E"]);

    app.run(function ($httpBackend) {

        console.log("In customerResourceMock.js");

        var customers = [
            {
                "customerId": 1,
                "firstName": "John",
                "lastName": "Rambo",
                "email": "john_rambo@mozu.com"
            },
            {
                "customerId": 2,
                "firstName": "Mike",
                "lastName": "Rambo",
                "email": "mike_rambo@mozu.com"
            }
        ];

        var customerUrl = "/api/customers";

        $httpBackend.whenGET(customerUrl).respond(customers);

        var editingRegex = new RegExp(customerUrl + "/[0-9][0-9]*", '');
        $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
            var customer = { "customerId": 0 };
            var parameters = url.split('/');
            var length = parameters.length;
            var id = parameters[length - 1];

            if (id > 0) {
                for (var i = 0; i < customers.length; i++) {
                    if (customers[i].customerId == id) {
                        customer = customers[i];
                        break;
                    }
                };
            }
            return [200, customer, {}];
        });

        $httpBackend.whenPOST(customerUrl).respond(function (method, url, data) {
            var customer = angular.fromJson(data);

            if (!customer.customerId) {
                // new customer Id
                customer.customerId = customers[customers.length - 1].customerId + 1;
                customers.push(customer);
            }
            else {
                // Updated customer
                for (var i = 0; i < customers.length; i++) {
                    if (customers[i].customerId == customer.customerId) {
                        customers[i] = customer;
                        break;
                    }
                };
            }
            return [200, customer, {}];
        });

        // Pass through any requests for application files
        $httpBackend.whenGET(/app/).passThrough();

    });

})();
