const mongoose = require('mongoose');

module.exports.UserSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
    },
    dob: { 
        type: String, },
    address: { 
        type: String 
    },
    phoneNumber: { 
        type: String 
    },
    state: { 
        type: String 
    },
    zipCode: { 
        type: String 
    },
    email: { 
        type: String, 
    },
    gender: { 
        type: String 
    },
    userType: { 
        type: String, 
    },
}, { timestamps: true });