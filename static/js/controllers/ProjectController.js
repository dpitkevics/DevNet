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

app.controller('ProjectEditController', ['$scope', '$location', '$rootScope', 'Project', function ($scope, $location, $rootScope, Project) {
    $rootScope.$on('$stateChangeStart', function () {
        $('select')
            .dropdown()
        ;
    });

    $scope.formClass = '';
    $scope.Model = new Project();
    $scope.save = function () {
        $scope.Model.$save()
            .then(function (result) {
                return $location.path(result.data.url);
            })
            .then(function () {
                $scope.Model = new Project();
            })
            .then(function () {
                return $scope.errors = null;
            }, function (rejection) {
                $scope.formClass = 'error';

                angular.forEach(rejection.data, function (value, name) {
                    var element = angular.element(document.querySelector('#id_' + name)).parent();

                    if (element.length) {
                        element.addClass('error');
                    }
                });

                return $scope.errors = rejection.data;
            });
    };

    $scope.change = function () {
        console.log($scope.Model);
    }
}]);