'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Technology Schema
 */
var TechnologySchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    },
    maxLevel: {
        type: Number,
        default: '',
    }
});



TechnologySchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    })
    .exec(cb);
};


mongoose.model('Technology', TechnologySchema);