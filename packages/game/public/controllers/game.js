'use strict';

angular.module('mean.game').controller('GameController', ['$scope', 'Global',
    function($scope, Global, Game) {
        $scope.global = Global;
        $scope.package = {
            name: 'game'
        };
    }
]);
