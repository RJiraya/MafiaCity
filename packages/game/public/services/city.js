'use strict';

angular.module('mean').factory('City',  ['$resource', '$http',
    function($resource, $http) {
        var consumer = $resource('cities/:id', { id : '@id' });


        return consumer;
    }
]);