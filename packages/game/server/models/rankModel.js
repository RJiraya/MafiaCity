'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Rank Schema
 */
var RankSchema = new Schema({
    name : {
        type : String
    },
    level : {
        type : Number,
    }
});


/**
 * Statics
 */
RankSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    })
    .exec(cb);
};

mongoose.model('Rank', RankSchema);