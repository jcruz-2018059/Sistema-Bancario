const mongoose = require('mongoose');

const depositSchema = mongoose.Schema({
    clientDestiny:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    noAccountDestiny:{
        type: Number,
        required: true
    },
    DPI:{
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
    },
    exp:{
        type: Date,
        required: true,
        default: Date()
    },
},{
    versionKey: false
});

module.exports = mongoose.model('Deposit', depositSchema);