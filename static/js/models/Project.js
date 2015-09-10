//app = angular.module('devnet.model.project', ['ngResource']);

app.factory('Project', ['$resource', function ($resource) {
    return $resource('/api/v1/projects/:id', {
        id: '@id'
    });
}]);