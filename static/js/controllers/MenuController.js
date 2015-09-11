app.controller('MenuController', ['$scope', 'Category', function ($scope, Category) {
    $scope.categories = [];
    $scope.categories = Category.query();
}]);