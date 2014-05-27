'use strict';

/**
 *  Controller Client
 */

angular.module('mean').controller('AvatarController',
    function($scope,  $location, $stateParams, Global, Gang) {
        $scope.global = Global;

        /**
         * Avatar
         */
        $scope.createAvatar =function(){              //idéalement lancement du Formulaire de création de l'avatar
            var testin =document. form2.creation_button.value;
            document.form2.output.value=testin;
            };

        $scope.DestroyAvatar =function(){              //Détruire l'avatar

        };

        $scope.Upgrader=function(){                    //augmenter en grade dans le clan

        };

        $scope.Downgrader=function(){                   //diminuer le grade dans le clan

        };
    }
);







