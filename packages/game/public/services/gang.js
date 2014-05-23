'use strict';

angular.module('mean').factory('Gang',  ['$resource',
    function($resource) {
        return $resource('gangs/:id', {}, {
            get: { method:'GET', params:{ id: '@id'} },
            query: { method:'GET', params:{ id: ''}, isArray:true },
            post: { method:'POST' },
            update: { method:'PUT', params: { id: '@id'}},
            remove: {method:'DELETE'}
        });
    }
]);