'use strict';

const mongoose = require('mongoose');

// name surname username accountNumber DPI address phone email password workName monthlyIncome balance role

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
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    userOrigin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    userDestination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "service",
        required: true,
    }
}, {versionKey: false});

module.exports = mongoose.model('Movement', movementScheme);