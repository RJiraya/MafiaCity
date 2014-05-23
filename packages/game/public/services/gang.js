'use strict';

angular.module('mean').factory('Gang',  ['$resource',
    function($resource) {
        return $resource('gangs/:gangId', {
            gangId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);