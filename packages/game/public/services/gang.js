'use strict';

angular.module('mean').factory('Gang',  ['$resource', '$http',
    function($resource, $http) {
        var consumer = $resource('gangs/:id', { id : '@id' });

        consumer.leave = function(cb){
            $http.post('gangs/leave').success(function(data) {
                cb(data);
            });
        };

        consumer.join = function(id, cb){
            $http.post('gangs/' + id + '/join').success(function(data) {
                cb(data);
            });
        };

        consumer.kick = function(id, cb){
            $http.post('gangs/' + id + '/kick').success(function(data) {
                cb(data);
            });
        };

        consumer.setBoss = function(id, cb){
            $http.post('gangs/' + id + '/setBoss').success(function(data) {
                cb(data);
            });
        };

        consumer.upgrade = function(id, cb){
            $http.post('/technologies/' + id + '/upgrade').success(function(data) {
                cb(data);
            });
        };

        return consumer;
    }
]);