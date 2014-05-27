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

        $scope.joinGang = function(id){
            Gang.join(id, function(data){
                $scope.global.user.gang = data.id;
                $location.path('/gangs/' + data.id);
                $scope.findGang();
            });
        };

        $scope.leaveGang = function(){
            Gang.leave(function(data){
                $scope.global.user.gang = null;
                $scope.gang = undefined;
                $location.path('/gangs/');
            });
        };

        $scope.findGang = function() {
            console.log($scope.global.user.gang);
            if($stateParams.gangId !== '' && $stateParams.gangId !== undefined){
               Gang.get({
                   id: $stateParams.gangId
               }, function(gang) {
                   $scope.gang = gang;
               });
            }else if($scope.global.user.gang !== null){
                Gang.get({
                   id: $scope.global.user.gang
                }, function(gang) {
                    $scope.gang = gang;
                });
            }else{
                $scope.gang = undefined;
            }
        };

        $scope.createGang = function() {
            var gang = new Gang({
                name: this.name,
                description: this.description
            });

            gang.$save(function(gang) {
                $location.path('/gangs/' + gang._id);
                $scope.global.user.gang = gang._id;
                if($scope.gangs === undefined) $scope.gangs = [];
                $scope.gangs.push(gang);
            });
        };

        $scope.kickPlayer = function(playerId){
            Gang.kick(playerId, function(data){
                $scope.gang.members = data.members;
            });
        };

        $scope.setBoss = function(playerId){
            Gang.setBoss(playerId, function(data){
                $scope.gang.boss = data.boss;
            });
        };

        $scope.upgradeTechnology = function(techId){
            Gang.upgrade(techId, function(data){
                $scope.gang.technologies = data.technologies;
            });
        };
    }
);
