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
    gang.members.push(req.user);

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
 * Join Gang
 */
exports.joinGang = function(req, res, id) {
    Gang.load(id, function(err, gang) {
        gang.members.push(req.user);
        req.user.gang = gang;
        req.user.save();
        gang.save(function(){
            gang.save();
            console.log(gang.name);
            res.jsonp({id : id});
        });
    });
};

/**
 * Kick Player
 */
exports.kickPlayer = function(req, res, id) {
    Gang.load(req.user.gang, function(err, gang) {
        if(gang !== null){
            for(var i = 0; i < gang.members.length; i++){
                if(gang.members[i]._id.equals(id)){
                    gang.members.splice(i, 1);
                    break;
                }
            }

            gang.save(function(){
                res.jsonp(gang);
            });
        }
    });
};

/**
 * Leave Gang
 */
exports.leaveGang = function(req, res) {
    Gang.load(req.user.gang, function(err, gang) {
        for(var i = 0; i < gang.members.length; i++){
            if(gang.members[i]._id.equals(req.user._id)){
                gang.members.splice(i, 1);
                break;
            }
        }
        req.user.gang = null;
        gang.save(function(){
            req.user.save(function(){
                res.jsonp(req.user);
            });
        });
    });
};


/**
 * Find gang by id
 */
exports.getGang = function(req, res, next, id) {
    Gang.load(id, function(err, gang) {
        if (err) return next(err);
        if (!gang) return next(new Error('Failed to load gang ' + id));
        res.jsonp(gang);
    });

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