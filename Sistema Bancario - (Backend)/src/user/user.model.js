'use strict';

const mongoose = require('mongoose');

// name surname username accountNumber DPI address phone email password workName monthlyIncome balance role

const userScheme = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    accountNumber: {
        type: Number,
        required: true,
        unique: true,
        maxLength: 10
    },
    DPI: {
        type: Number,
        required: true,
        unique: true,
        minLength: 13,
        maxLength: 13
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        minLength: 8
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    workName:{
        type: String,
        required: true
    },
    monthlyIncome:{
        type: Number,
        required: true
    },
    balance:{
        type: Number,
        required: true
    },
    dailyTransfer:{
        type: Number,
        required: true,
        default: 0 
    },
    lastReset: {
        type: Date,
        required: true,
        default: Date.now()
    },
    movements: {
        type: Number,
        required: true,
        default: 0
    },
    role: {
        type: String,
        required: true,
        uppercase: true,
        enum:['ADMIN', 'CLIENT'],
        default: 'CLIENT'
    }
}, {versionKey: false});

module.exports = mongoose.model('User', userScheme);