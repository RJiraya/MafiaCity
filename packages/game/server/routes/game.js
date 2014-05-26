'use strict';
/**
 * Route Server
 */

var game = require('../controllers/game');

// The Package is past automatically as first parameter
module.exports = function(Game, app, auth, database) {

    app.get('/game/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/game/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/game/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });
    
    app.get('/hideaway/renderer', function(req, res, next) {
        Game.render('hideaway', {
            package: 'game'
        }, function(err, html) {
            /*Rendering a view from the Package server/views*/
            res.send(html);
        });
    });
    
    app.get('/gangs/', function(req, res, next) {
        Game.render('gang', {
            package: 'game'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });

    app.get('/game/example/render', function(req, res, next) {
        Game.render('index', {
            package: 'game'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });

    app.get('/gangs/:id', function(req, res, next) {
        game.getGang(req, res, next, req.params.id);
    });

    app.route('/gangs')
        .get(game.getAllGang)
        .post(auth.requiresLogin, game.createGang);
};
