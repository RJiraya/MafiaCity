'use strict';
/**
 *  Route Client
 */

angular.module('mean').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('game example page', {
            url: '/game/example',
            templateUrl: 'game/views/index.html'
        })
		.state('gangs list', {
			url: '/gangs/list',
			templateUrl: 'game/views/gangSearch.html'
        })
        .state('gangs', {
            url: '/gangs/:gangId',
            templateUrl: 'game/views/gangDetail.html'
        })
        .state('hideaway', {
			url: '/hideaway',
			templateUrl: 'game/views/hideaway.html'
        });
    }
]);
