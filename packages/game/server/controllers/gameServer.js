'use strict';



/**
 *  Controller Server
 */
var mongoose = require('mongoose'),
    Technology = mongoose.model('Technology'),
    Rank = mongoose.model('Rank'),
    User = mongoose.model('User'),
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

    Rank.findOne({ level : '3' }, function(err, rank){
        // Add Boss to gang
        gang.members.push({
            member : req.user,
            rank : rank
        });

        Technology.find().exec(function(err, techs) {
            if (err) {
                console.log(err);
            } else {
                // Init Technologies
                for(var key in techs){
                    gang.technologies.push({
                        technology : techs[key]._id,
                        level : 0
                    });
                }

                // Save gang
                gang.save(function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        // then save user
                        req.user.gang = gang;
                        req.user.rankLevel = rank.level;
                        req.user.save(function(){
                            res.jsonp(gang);
                        });
                    }
                });
            }
        });
    });
};

/**
 * Join Gang
 */
exports.joinGang = function(req, res, id) {
    Gang.load(id, function(err, gang) {
        Rank.findOne({ level : 0 }, function(err, rank){
            gang.members.push({ member : req.user, rank : rank });
            req.user.gang = gang;
            req.user.save();
            gang.save(function(){
                gang.save();
                res.jsonp({id : id});
            });
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
                if(gang.members[i].member._id.equals(id)){
                    gang.members.splice(i, 1);
                    break;
                }
            }
            User.findOne({
                _id: id
            }).exec(function(err, user){
                user.gang = null;
                user.rankLevel = null;
                user.save();
            });
            gang.save(function(){
                res.jsonp(gang);
            });
        }
    });
};

/**
 * Set Rank
 */
exports.setRank = function(req, res, userId, rankLevel) {

    Rank.findOne({level : rankLevel }, function(err, rank){
        Gang.load(req.user.gang, function(err, gang) {
            for(var i = 0; i < gang.members.length; i++){
                if(gang.members[i].member._id.equals(userId)){
                    gang.members[i].rank = rank;
                    break;
                }
            }

            User.findOne({ _id : userId }, function(err, user){
                user.rankLevel = rank.level;
                user.save();
                gang.save(function(err, gang){
                    res.jsonp(gang);
                });
            });
        });
    });
};


exports.getAllRanks = function(req, res){
    Rank.find().exec(function(err, ranks) {
        if (err) {
            res.render('error', {
             status: 500
            });
        } else {
            res.jsonp(ranks);
        }
     });
};
/**
 * Leave Gang
 */
exports.leaveGang = function(req, res) {
    Gang.load(req.user.gang, function(err, gang) {
        if(gang.boss===req.user._id){
            res.jsonp(req.user);
        }else{
            for(var i = 0; i < gang.members.length; i++){
                if(gang.members[i].member._id.equals(req.user._id)){
                    gang.members.splice(i, 1);
                    break;
                }
            }
            req.user.gang = null;
            req.user.rankLevel = null;

            if(gang.members.length === 0){
                gang.remove(function(){
                    req.user.save(function(){
                        res.jsonp(req.user);
                    });
                });
            }else{
                gang.save(function(){
                    req.user.save(function(){
                        res.jsonp(req.user);
                    });
                });
            }



        }
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

/**
 * Technologies
 */
 exports.getAllTechnologies = function(req, res) {
     Technology.find().exec(function(err, techs) {
         if (err) {
             res.render('error', {
                 status: 500
             });
         } else {
             res.jsonp(techs);
         }
     });
 };

 exports.upgradeTechnology = function(req, res, id) {
      Gang.load(req.user.gang, function(err, gang){
          if (err) {
              res.render('error', {
                  status: 500
              });
          } else {

                var i = gang.getTechnology(id);

                if(gang.canUpgradeTechnology(id)){
                    console.log(i);
                    console.log(gang.technologies[i]);
                    gang.technologies[i].level++;
                }

                gang.save(function(err, gang){
                    res.jsonp(gang);
                });
          }
      });
  };