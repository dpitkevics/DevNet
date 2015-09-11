app.factory('Category', ['$resource', function ($resource) {
    return $resource('/api/v1/categories/:id', {
        id: '@id'
    });
}]);

app.factory('CategorySlug', ['$resource', function ($resource) {
    return $resource('/api/v1/categories/slug/:slug', {
        slug: '@slug'
    });
}]);