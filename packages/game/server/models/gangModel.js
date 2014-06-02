'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Gang Schema
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
    },
    members: [
    {
        member : {
            type : Schema.ObjectId,
            ref : 'User'
        },
        rank : {
            type : Schema.ObjectId,
            ref : 'Rank'
        }
    }],
    technologies: [{
        level : {
            type: Number
        },
        technology: {
            type : Schema.ObjectId,
            ref : 'Technology'
        }
    }]
});

/**
 * Validations
 */
/*
GangSchema.path('technologies').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');
*/

GangSchema.methods.canUpgradeTechnology = function(id){
    for(var i = 0; i < this.technologies.length; i++){
        if(this.technologies[i].technology._id.equals(id)){
            return (this.technologies[i].technology.maxLevel >= this.technologies[i].level + 1);
        }
    }
    return false;
};

GangSchema.methods.getTechnology = function(id){
    for(var i = 0; i < this.technologies.length; i++){
        if(this.technologies[i].technology._id.equals(id)){
            return i;
        }
    }
    return -1;
};

/**
 * Statics
 */
GangSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    })
    .populate('boss', 'name username')
    .populate('members.member', 'name username')
    .populate('members.rank', 'name')
    .populate('technologies.technology', 'name maxLevel')
    .exec(cb);
};

mongoose.model('Gang', GangSchema);