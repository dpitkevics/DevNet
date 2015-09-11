app.factory('Project', ['$resource', function ($resource) {
    return $resource('/api/v1/projects/:id', {
        id: '@id'
    });
}]);

app.factory('ProjectSlug', ['$resource', function ($resource) {
    return $resource('/api/v1/projects/slug/:slug', {
        slug: '@slug'
    });
}]);

app.factory('ProjectCategory', ['$resource', function ($resource) {
    return $resource('/api/v1/projects/:category', {
        category: '@category'
    });
}]);