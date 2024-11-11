const mongoose = require('mongoose');

module.exports.PolicyCategorySchema = new mongoose.Schema({
    categoryName: { 
        type: String,
    },
},{timestamps:true});