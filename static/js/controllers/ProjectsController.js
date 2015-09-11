app.controller('ProjectsController', ['$scope', 'Project', function ($scope, Project) {
    $scope.projects = [];
    $scope.projects = Project.query();
}]);

app.controller('CategoryProjectsController', ['$scope', 'ProjectCategory', 'CategorySlug', function ($scope, ProjectCategory, CategorySlug) {
    $scope.projects = [];

    $scope.init = function (categorySlug) {
        $scope.category = CategorySlug.get({
            slug: categorySlug
        });

        $scope.projects = ProjectCategory.query({
            category: categorySlug
        });
    };
}]);