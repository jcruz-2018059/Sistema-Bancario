'use strict';

const mongoose = require('mongoose');

const movementScheme = mongoose.Schema({
    type: {
        type: String,
        enum: ['TRANSFER', 'CREDIT', 'PUCHARSE'],
        uppercase: true,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    userOrigin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    //TRANSFERENCIA
    userDestination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    //COMPRA
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: false,
    }
}, {versionKey: false});

module.exports = mongoose.model('Movement', movementScheme);