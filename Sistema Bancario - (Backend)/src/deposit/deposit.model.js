const mongoose = require('mongoose');

const depositSchema = mongoose.Schema({
    clientOrigin:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    NoAccountOrigin:{
        type: Number,
        required: true,
    },
    clientDestiny:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    NoAccountDestiny:{
        type: Number,
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
        default: Date()
    }
},{
    versionKey: false
});

module.exports = mongoose.model('Deposit', depositSchema);