

const mongoose = require('mongoose');


const favoritesSchema = mongoose.Schema({
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    clientLogged:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    alias:{
        type: String,
        required: true
    },
    accountNumber: {
        type: Number,
        required: true,
        unique: true,
        maxLength: 10
    },
    dpi: {
        type: Number,
        required: true,
        unique: true,
        minLength: 13,
        maxLength: 13
    }
},{
    versionKey: false
});

module.exports = mongoose.model('Favorite', favoritesSchema);