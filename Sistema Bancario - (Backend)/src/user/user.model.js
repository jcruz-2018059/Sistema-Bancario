'use strict'

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
        unique: true
    },
    DPI: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v); 
            },
            message: "Porfavor ingrese un correo válido."
        }
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
    role: {
        type: String,
        required: true,
        uppercase: true,
        enum:['ADMIN', 'CLIENT'],
        default: 'CLIENT'
    }
}, {versionKey: false});

module.exports = mongoose.model('User', userScheme);