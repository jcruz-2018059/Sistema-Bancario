

const mongoose = require('mongoose');


const favoritesSchema = mongoose.Schema({
    cliente:{
        type: String,
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