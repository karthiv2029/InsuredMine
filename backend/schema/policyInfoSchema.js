const mongoose = require('mongoose');

module.exports.PolicyInfoSchema = new mongoose.Schema({
    policyNumber: { 
        type: String, 
    },
    policyStartDate: { 
        type: String, 
    },
    policyEndDate: { 
        type: String, 
    },
    policyCategoryId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Policy_Category' 
    },
    companyCollectionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Policy_Carrier' 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
}, { timestamps: true });