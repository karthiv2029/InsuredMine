const mongoose = require('mongoose');

module.exports.UserAccountSchema = new mongoose.Schema({
    accountName: { 
        type: String, 
    },
},{timestamps:true});