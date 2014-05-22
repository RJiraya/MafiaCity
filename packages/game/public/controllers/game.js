'use strict';
/**
 *  Controller Client
 */

angular.module('GameController', []).controller('GameController', ['$scope', '$location', 'Global',
    function($scope,  $location, Global) {
        $scope.global = Global;

        $scope.hasGang = true;

        $scope.package = {
            name: 'game'
        };

        $scope.createGang = function() {
            /*
            var gang = new Gang({
                name: this.name,
                description: this.description
            });

            gang.$save(function(response) {
                $location.path('game/gang');
            });

            this.title = '';
            this.content = '';
            */
        };
    }
]);
