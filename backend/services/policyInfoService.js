const mongoose = require("mongoose");
const PolicyInfoSchema = require("../schema/policyInfoSchema").PolicyInfoSchema;
const PolicyInfo = mongoose.model("Policy_Info",PolicyInfoSchema);
const UserSchema = require("../schema/userSchema").UserSchema;
const User = mongoose.model("User", UserSchema);
const returnJsonResponse = require("../utils/helper").returnJsonResponse;

module.exports.filterPolicy = async function (query) {
    try{        
        const user = await User.findOne({ firstName: query }).exec();

        if (!user) {
            return returnJsonResponse("User Not Found", 400);
        }

        const policyInfo = await PolicyInfo.find({ userId: user._id })
        .populate('policyCategoryId')
        .populate('companyCollectionId')
        .exec();

        return returnJsonResponse("Fetch successfully", 200,policyInfo);
    }catch(err){
        return returnJsonResponse("UnExpected Data", 500);
    }
}

module.exports.aggregatedPolicy = async function () {
    try{        
        const result = await PolicyInfo.aggregate([
            {
              '$group': {
                '_id': '$userId', 
                'totalPolicies': {
                  '$sum': 1
                }, 
                'policies': {
                  '$push': '$policyNumber'
                }, 
                'user': {
                  '$push': '$userId'
                }
              }
            }, {
              '$unwind': {
                'path': '$user', 
                'preserveNullAndEmptyArrays': true
              }
            }
          ]);

        return returnJsonResponse("Fetch successfully", 200,result);
    }catch(err){
        return returnJsonResponse("UnExpected Data", 500);
    }
}