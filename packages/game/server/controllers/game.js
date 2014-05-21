'use strict';



var mongoose = require('mongoose'),
    Gang = mongoose.model('Gang');
    
    
/**
 * Game hideaway
 */
exports.test = function(req, res) {
    res.jsonp({articles : 'toto'});
};

/**
 * Create a gang
 */
exports.createGang = function(req, res) {
	var gang = new Gang();

    gang.boss = req.user;

	gang.save(function(err) {
        if (err) {
            return res.send('game/gang', {
                errors: err.errors                
            });
        } else {
            res.jsonp(gang);
        }
    });
};