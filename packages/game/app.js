'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Game = new Module('Game');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Game.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Game.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Game.menus.add({
        title: 'game example page',
        link: 'game example page',
        roles: ['authenticated'],
        menu: 'main'
    });
	
    Game.menus.add({
        title: 'Planque',
        link: 'game hideaway',
        roles: ['authenticated'],
        menu: 'main'
    });
	
    Game.menus.add({
        title: 'Gangs List',
        link: 'gangs list',
        roles: ['authenticated'],
        menu: 'main'
    });

    Game.menus.add({
        title: 'Mon Gang',
        link: 'gangs',
        roles: ['authenticated'],
        menu: 'main'
    });
	
    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Game.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Game.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Game.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Game;
});
