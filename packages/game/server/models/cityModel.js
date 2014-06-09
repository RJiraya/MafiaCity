'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * City Schema
 */
var CitySchema = new Schema({
    name : {
        type : String
    },
    lat : {
        type : Number
    },
    lng : {
        type : Number
    },
    maxBuildingCount : {
        type : Number
    },
    buildings : [{
        building : {
            type : Schema.ObjectId,
            ref : 'Building'
        },
        gang : {
            type : Schema.ObjectId,
            ref : 'Gang'
        },
        level : {
            type : Number,
            default : 0
        }
    }]
});


/**
 * Statics
 */
CitySchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    })
    .exec(cb);
};

mongoose.model('City', CitySchema);