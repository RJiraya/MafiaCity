'use strict';
/**
 *  Route Client
 */

angular.module('mean').config(['$stateProvider',
    function($stateProvider) {

        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0') $timeout(deferred.resolve);

                // Not Authenticated
                else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        $stateProvider.state('game example page', {
            url: '/game/example',
            templateUrl: 'game/views/index.html'
        })
		.state('gangs list', {
			url: '/gangs/list',
			templateUrl: 'game/views/gangSearch.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .state('gangs', {
            url: '/gangs/:gangId',
            templateUrl: 'game/views/gangDetail.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .state('hideaway', {
			url: '/hideaway',
			templateUrl: 'game/views/hideaway.html',
            resolve: {
               loggedin: checkLoggedin
            }
        });
    }
]);
