'use strict';

angular.module('mean.controllers.login', [])
    .controller('LoginCtrl', ['$scope', '$rootScope', '$http', '$location', 'Global',
        function($scope, $rootScope, $http, $location, Global) {
            // This object will be filled by the form
            $scope.user = {};
            // Register the login() function
            $scope.login = function() {
                $http.post('/login', {
                    email: $scope.user.email,
                    password: $scope.user.password
                })
                .success(function(response) {
                    // authentication OK
                    $scope.loginError = 0;
                    $rootScope.user = response.user;
                    Global.user = response.user;
                    console.log(Global);
                    $rootScope.$emit('loggedin');

                    if (response.redirect) {
                        if (window.location.href === response.redirect) {
                            //This is so an admin user will get full admin page
                            window.location.reload();
                        } else {
                            window.location = response.redirect;
                        }
                    } else {
                        $location.url('/');
                    }
                })
                .error(function() {
                    $scope.loginerror = 'Authentication failed.';
                });
            };
        }
    ])
    .controller('RegisterCtrl', ['$scope', '$rootScope', '$http', '$location', 'Global',
        function($scope, $rootScope, $http, $location, Global) {
            $scope.user = {};

            $scope.register = function() {
                $scope.usernameError = null;
                $scope.registerError = null;
                $http.post('/register', {
                    email: $scope.user.email,
                    password: $scope.user.password,
                    confirmPassword: $scope.user.confirmPassword,
                    username: $scope.user.username,
                    name: $scope.user.name
                })
                .success(function() {
                    // authentication OK
                    $scope.registerError = 0;
                    $scope.user.gang = null;
                    $rootScope.user = $scope.user;
                    Global.user = $scope.user;
                    $rootScope.$emit('loggedin');
                    $location.url('/');
                })
                .error(function(error) {
                    // Error: authentication failed
                    if (error === 'Username already taken') {
                        $scope.usernameError = error;
                    } else {
                        $scope.registerError = error;
                    }
                });
            };
        }
    ]);