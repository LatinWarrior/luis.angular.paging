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
            },
            {
                "customerId": 3,
                "firstName": "Bob",
                "lastName": "Rambo",
                "email": "bob_rambo@mozu.com"
            },
            {
                "customerId": 4,
                "firstName": "Ann",
                "lastName": "Rambo",
                "email": "ann_rambo@mozu.com"
            },
            {
                "customerId": 5,
                "firstName": "Parker",
                "lastName": "Rambo",
                "email": "parker_rambo@mozu.com"
            },
            {
                "customerId": 6,
                "firstName": "John",
                "lastName": "Jones",
                "email": "john_jones@mozu.com"
            },
            {
                "customerId": 7,
                "firstName": "Mike",
                "lastName": "Jones",
                "email": "mike_jones@mozu.com"
            },
            {
                "customerId": 8,
                "firstName": "Bob",
                "lastName": "Jones",
                "email": "bob_jones@mozu.com"
            },
            {
                "customerId": 9,
                "firstName": "Ann",
                "lastName": "Jones",
                "email": "ann_jones@mozu.com"
            },
            {
                "customerId": 10,
                "firstName": "Parker",
                "lastName": "Jones",
                "email": "parker_jones@mozu.com"
            },
            {
                "customerId": 11,
                "firstName": "John",
                "lastName": "Wayne",
                "email": "john_wayne@mozu.com"
            },
            {
                "customerId": 12,
                "firstName": "Mike",
                "lastName": "Wayne",
                "email": "mike_wayne@mozu.com"
            },
            {
                "customerId": 13,
                "firstName": "Bob",
                "lastName": "Wayne",
                "email": "bob_wayne@mozu.com"
            },
            {
                "customerId": 14,
                "firstName": "Ann",
                "lastName": "Wayne",
                "email": "ann_wayne@mozu.com"
            },
            {
                "customerId": 15,
                "firstName": "Parker",
                "lastName": "Wayne",
                "email": "parker_wayne@mozu.com"
            },
            {
                "customerId": 16,
                "firstName": "John",
                "lastName": "Simpson",
                "email": "john_simpson@mozu.com"
            },
            {
                "customerId": 17,
                "firstName": "Mike",
                "lastName": "Simpson",
                "email": "mike_simpson@mozu.com"
            },
            {
                "customerId": 18,
                "firstName": "Bob",
                "lastName": "Simpson",
                "email": "bob_simpson@mozu.com"
            },
            {
                "customerId": 19,
                "firstName": "Ann",
                "lastName": "Simpson",
                "email": "ann_simpson@mozu.com"
            },
            {
                "customerId": 20,
                "firstName": "Parker",
                "lastName": "Simpson",
                "email": "parker_simpson@mozu.com"
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
