'use strict';
/**
 *  Controller Client
 */

angular.module('mean').controller('GameController',
    function($scope,  $location, $stateParams, Global, Gang) {
        //Ref Table
        Global.resources = window.resources;

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
            Gang.getRanks(function(data){
                 $scope.ranks = data;

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
            });
        };

        $scope.joinGang = function(id){
            Gang.join(id, function(data){
                $scope.global.user.gang = data.id;
                $scope.findGang();
                $location.path('/gangs/' + data.id);
            });
        };

        $scope.leaveGang = function(){
            Gang.leave(function(data){
                $scope.global.user = data;
                $scope.gang = undefined;
                $location.path('/gangs/');
            });
        };

        $scope.createGang = function() {
            var gang = new Gang({
                name: this.name,
                description: this.description
            });

            gang.$save(function(gang) {
                //Update User Gang
                $location.path('/gangs/' + gang._id);
                $scope.global.user.gang = gang._id;
                $scope.global.user.rankLevel = 3;

                //Update Gang List
                if($scope.gangs === undefined) $scope.gangs = [];
                $scope.gangs.push(gang);
            });
        };

        /**
         * Actions
         */
        $scope.kickPlayer = function(playerId){
            Gang.kick(playerId, function(data){
                $scope.gang.members = data.members;
            });
        };

        $scope.setRank = function(id, rank){
            Gang.setRank(id, rank.level, function(data){
                $scope.gang.members = data.members;
            });
        };

        $scope.upgradeTechnology = function(techId){
            Gang.upgrade(techId, function(data){
                $scope.gang.technologies = data.technologies;
                $scope.global.user.resources = data.resources;
            });
        };

        $scope.hasGangAuthorisation = function(level){
            return $scope.global.user.rankLevel >= level;
        };
    }
);
