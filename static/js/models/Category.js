//app = angular.module('devnet.model.category', ['ngResource']);

app.factory('Category', ['$resource', function ($resource) {
    return $resource('/api/v1/categories/:id', {
        id: '@id'
    });
}]);