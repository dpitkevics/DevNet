//var app = angular.module('devnet.controllers.menu', ['devnet.model.category']);

console.log(app);

app.controller('MenuController', ['$scope', 'Category', function ($scope, Category) {
    $scope.categories = Category.query();
}]);