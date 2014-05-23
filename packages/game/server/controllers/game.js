'use strict';
/**
 *  Controller Server
 */



var mongoose = require('mongoose'),
    Gang = mongoose.model('Gang');




/**
 * Find gang by id
 */
exports.gang = function(req, res, next, id) {
    Gang.load(id, function(err, gang) {
        if (err) return next(err);
        if (!gang) return next(new Error('Failed to load gang ' + id));
        req.gang = gang;
        next();
    });
};

/**
 * Create a gang
 */
exports.createGang = function(req, res) {
	var gang = new Gang(req.body);

    gang.boss = req.user;

    gang.members.push(req.user._id);

	gang.save(function(err) {
        if (err) {
            return res.send('gangs', {
                errors: err.errors                
            });
        } else {
            req.user.gang = gang;
            req.user.save();
            res.jsonp(gang);
        }
    });


};


/**
 * Find gang by id
 */
exports.getGang = function(req, res, next, id) {
    res.jsonp(req.gang);
};


/**
* Show all Gangs
*/
exports.getAllGang = function(req, res) {
    Gang.find().populate('boss', 'name username').exec(function(err, gangs) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(gangs);
        }
    });
};