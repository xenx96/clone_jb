const mongoose = require('mongoose');

// schema
const { Schema } = mongoose;
const userSchema = new Schema({
    ID : {type : String,
        required :[true,'ID is Required!']},
    PW : {type : String,
        required :[true,'PW is Required!']},
    NM: { // User Name
        type: String,
        required: [true, 'NM is required!'],
    },
    PN: { // Phone Number
        type: String,
        unique: true,
    },
    EM: { // Email
        type: String,
        unique: true,
        required: [true, 'EM is required!'],
    },
    CA: { // Created At
        type: Date,
        default: Date.now(),
    },
    UA: { // Updated At
        type: Date,
        default: Date.now(),
    }
}, { collection: 'user' });

module.exports = mongoose.model('user', userSchema, 'user');