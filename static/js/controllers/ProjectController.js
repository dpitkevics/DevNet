app.controller('ProjectController', ['$scope', 'ProjectSlug', function ($scope, ProjectSlug) {
    $scope.init = function (projectSlug) {
        $scope.project = ProjectSlug.get({
            slug: projectSlug
        });

        $('.popup-item')
            .popup()
        ;
    };
}]);

app.controller('ProjectEditController', ['$scope', 'Project', function ($scope, Project) {
    $scope.formClass = '';
    $scope.Project = new Project();
    $scope.save = function () {
        $scope.Project.$save()
            .then(function (result) {
                console.log(result);
            })
            .then(function () {
                $scope.Project = new Project();
            })
            .then(function () {
                return $scope.errors = null;
            }, function (rejection) {
                $scope.formClass = 'error';
                return $scope.errors = rejection.data;
            });
    };
}]);