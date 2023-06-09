
const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
},{
    versionKey: false
});

module.exports = mongoose.model('Service', serviceSchema);
