'use strict';

// public/js/services/GeekService.js
angular.module('GangService', []).factory('Gang', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/game/gang');
        },

        // call to POST and create a new geek
        create : function(geekData) {
            return $http.post('/game/gang', geekData);
        },

        // call to DELETE a geek
        delete : function(id) {
            return $http.delete('/game/gang' + id);
        }
    };

}]);