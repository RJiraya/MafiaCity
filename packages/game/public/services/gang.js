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

        consumer.setRank = function(id, level, cb){
            $http.post('gangs/' + id + '/setRank/' + level).success(function(data) {
                cb(data);
            });
        };

        consumer.getRanks = function(cb){
            $http.get('ranks').success(function(data) {
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