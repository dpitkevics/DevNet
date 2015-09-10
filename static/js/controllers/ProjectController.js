//app = angular.module('devnet', ['devnet.model.project']);

app.controller('ProjectController', ['$scope', 'Project', function ($scope, Project) {
    $scope.projects = Project.query();
}]);