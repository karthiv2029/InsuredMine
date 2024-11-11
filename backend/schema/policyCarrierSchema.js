const mongoose = require('mongoose');

module.exports.PolicyCarrierSchema = new mongoose.Schema({
    companyName: { 
        type: String, 
    },
},{timestamps:true});