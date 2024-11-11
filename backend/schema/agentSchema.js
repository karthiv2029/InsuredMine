const mongoose = require("mongoose");
 
module.exports.AgentSchema = new mongoose.Schema({
    name: { 
        type: String, 
    },
},{timestamps:true});