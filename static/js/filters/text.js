app.filter('capitalize', function () {
    return function (input, scope) {
        if (input != null)
            input = input.toLowerCase();
        return input.substring(0, 1).toUpperCase() + input.substring(1);
    }
});

app.filter('normalize', function (capitalizeFilter) {
    return function (input, scope) {
        return capitalizeFilter(input.replace(/_/g, ' '));
    }
});