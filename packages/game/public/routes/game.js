'use strict';
/**
 *  Route Client
 */

angular.module('GameController').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('game example page', {
            url: '/game/example',
            templateUrl: 'game/views/index.html'
        })
		.state('game gang', {
			url: '/game/gang',
			templateUrl: 'game/views/gang.html'
        })
        .state('game hideaway', {
			url: '/game/hideaway',
			templateUrl: 'game/views/hideaway.html'
        });
    }
]);
