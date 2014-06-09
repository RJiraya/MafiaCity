'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Building Schema
 */
var BuildingSchema = new Schema({
    name : {
        type : String
    },
    description : {
        type : String
    },
});


/**
 * Statics
 */
BuildingSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    })
    .exec(cb);
};

mongoose.model('Building', BuildingSchema);