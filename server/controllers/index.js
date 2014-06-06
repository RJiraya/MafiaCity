'use strict';

var mean = require('meanio'),
    mongoose = require('mongoose'),
    Resource = mongoose.model('Resource');

exports.render = function(req, res) {

    var modules = [];

    // Preparing angular modules list with dependencies
    for (var name in mean.modules) {
        modules.push({
            name: name,
            module: 'mean.' + name,
            angularDependencies: mean.modules[name].angularDependencies
        });
    }

    function isAdmin() {
        return req.user && req.user.roles.indexOf('admin') !== -1;
    }
    Resource.find(function(err, resources){
        // Send some basic starting info to the view
            res.render('index', {
                user: req.user ? {
                    name: req.user.name,
                    _id: req.user._id,
                    username: req.user.username,
                    roles: req.user.roles,
                    gang: req.user.gang,
                    rankLevel: req.user.rankLevel,
                    resources: req.user.resources,
                    test : 'toto'
                } : {},
                resources : resources,
                modules: modules,
                isAdmin: isAdmin,
                adminEnabled: isAdmin() && mean.moduleEnabled('mean-admin')
            });
    });

};
