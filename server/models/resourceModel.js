'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Resource Schema
 */
var ResourceSchema = new Schema({
    name: {
        type: String,
        default: ''
    }
});

/**
 * Statics
 */
ResourceSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    })
    .exec(cb);
};

mongoose.model('Resource', ResourceSchema);