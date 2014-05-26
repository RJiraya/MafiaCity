'use strict';

angular.module('mean').factory('Gang',  ['$resource',
    function($resource) {
        return $resource('gangs/:id', {id : '@id'});
    }
]);