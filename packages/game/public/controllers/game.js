'use strict';
/**
 *  Controller Client
 */

angular.module('mean').controller('GameController', ['$scope', '$location', '$stateParams', 'Global', 'Gang', 'Articles',
    function($scope,  $location, $stateParams, Global, Gang, Articles) {
        $scope.global = Global;

        $scope.package = {
            name: 'game'
        };


        /**
         * Gangs
         */
        $scope.findAllGang = function(){
            Gang.query(function(gangs) {
                $scope.gangs = gangs;
            });
        };

        $scope.findGang = function() {
            Gang.get({
                id: '537e63a274da97301e165543'
            }, function(gang) {
                $scope.gang = gang;
            });
        };

        $scope.createGang = function() {
            var gang = new Gang({
                name: this.name,
                description: this.description
            });

            gang.$save(function(response) {
                $location.path('/gangs/list');
                $scope.gangs.push(response);
            });
        };
    }
]);
