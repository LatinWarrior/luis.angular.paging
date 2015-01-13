(function () {
    'use strict';

    angular
        .module('customerManagement')
        .directive('pager', pager);

    pager.$inject = ['$window', 'customerService'];

    function pager($window, customerService) {

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            templateUrl: "app/full/pager.html",
            scope: {
                totalPages: "=",
                currentPage: "=",
                pageAction: "&"
            }
        };

        return directive;

        function link(scope, element, attrs) {
            scope.pages = [];
            scope.$watch('totalPages', function () {
                createPageArray(scope.pages, scope.totalPages);
            });
            scope.gotoPage = function (page) {
                scope.pageAction({ pageNumber: page });
            };
        }

        function createPageArray(pages, totalPages) {
            var i;
            pages.length = 0;

            for (i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        }
    }

})();