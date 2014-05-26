'use strict';
/**
 *  Controller Client
 */

angular.module('mean').controller('GameController',
    function($scope,  $location, $stateParams, Global, Gang) {
        $scope.global = Global;

        $scope.package = {
            name: 'game'
        };
        $scope.nameFilter = '';

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
                id: $scope.global.user.gang
            }, function(gang) {
                $scope.gang = gang;
            });
        };

        $scope.createGang = function() {
            var gang = new Gang({
                name: this.name,
                description: this.description
            });

            gang.$save(function(gang) {
                $location.path('/gangs/list');
                $scope.global.user.gang = gang._id;
                $scope.gangs.push(gang);
            });
        };
    }
);
