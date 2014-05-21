'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var GangSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    boss: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
/*
GangSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');
*/
/**
 * Statics
 */
/*
GangSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

*/

mongoose.model('Gang', GangSchema);