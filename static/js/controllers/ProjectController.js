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