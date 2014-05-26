'use strict';

angular.module('mean').factory('Gang',  ['$resource', '$http',
    function($resource, $http) {
        var consumer = $resource('gangs/:id', { id : '@id' });

        consumer.leave = function(){
            $http.post('gangs/leave').success(function() {
                console.log('ok');
            });
        };

        consumer.join = function(id){
            $http.post('gangs/' + id + '/join').success(function() {
                console.log('ok');
            });
        };

        return consumer;
    }
]);