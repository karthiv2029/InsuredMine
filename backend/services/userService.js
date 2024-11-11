const mongoose = require("mongoose");
const UserSchema = require("../schema/userSchema").UserSchema;
const User = mongoose.model("User", UserSchema);
const AgentSchema = require("../schema/agentSchema").AgentSchema;
const Agent = mongoose.model("Agent", AgentSchema);
const PolicyCarrierSchema = require("../schema/policyCarrierSchema").PolicyCarrierSchema;
const PolicyCarrier = mongoose.model("Policy_Carrier", PolicyCarrierSchema);
const PolicyCategorySchema = require("../schema/policyCategorySchema").PolicyCategorySchema;
const PolicyCategory = mongoose.model("Policy_Category", PolicyCategorySchema);
const UserAccountSchema = require("../schema/userAccountSchema").UserAccountSchema;
const Users_Account = mongoose.model("Users_Account", UserAccountSchema);
const PolicyInfoSchema = require("../schema/policyInfoSchema").PolicyInfoSchema;
const PolicyInfo = mongoose.model("Policy_Info", PolicyInfoSchema);
const returnJsonResponse = require("../utils/helper").returnJsonResponse;

module.exports.csvProcessData = async function (data) {
  try {
    async function saveDataToDatabase(data) {
      for (var item of data) {
        try {
          let savedUser = null;
          if (item.firstname && item.dob) {
            const user = new User({
              firstName: item.firstname,
              dob: item.dob,
              address: item.address,
              phoneNumber: item.phone,
              email: item.email,
              state: item.state,
              zipCode: item.zip,
              gender: item.gender,
              userType: item.userType,
            });
            mongoose.connect(process.env.MONGODB_URI, {
              useNewUrlParser: true,
              useUnifiedTopology: true
            })
              .then(() => {
                savedUser =user;
                user.save()
                  .then(() => {
                    console.log('User saved successfully');
                  })
                  .catch(err => {
                    console.error('Error saving user:', err);
                  });
          });            
            console.log(`Saved user ${item.firstname} successfully.`);
          }

          let savedAgent = null;
          if (item.agent) {
            const existingAgent = await Agent.findOne({ name: item.agent });
            if (!existingAgent) {
              const agent = new Agent({ name: item.agent });
              savedAgent = await agent.save();
              console.log(`Saved agent ${item.agent} successfully.`);
            } else {
              savedAgent = existingAgent;
              console.log(`Agent ${item.agent} already exists.`);
            }
          }

          let savedCarrier = null;
          if (item.company_name) {
            const existingCarrier = await PolicyCarrier.findOne({ companyName: item.company_name });
            if (!existingCarrier) {
              const policyCarrier = new PolicyCarrier({ companyName: item.company_name });
              savedCarrier = await policyCarrier.save();
              console.log(`Saved policy carrier ${item.company_name} successfully.`);
            } else {
              savedCarrier = existingCarrier;
              console.log(`Policy carrier ${item.company_name} already exists.`);
            }
          }

          let savedCategory = null;
          if (item.category_name) {
            const existingCategory = await PolicyCategory.findOne({ categoryName: item.category_name });
            if (!existingCategory) {
              const policyCategory = new PolicyCategory({ categoryName: item.category_name });
              savedCategory = await policyCategory.save();
              console.log(`Saved policy category ${item.category_name} successfully.`);
            } else {
              savedCategory = existingCategory;
              console.log(`Policy category ${item.category_name} already exists.`);
            }
          }

          if (item.account_name) {
            const userAccount = new Users_Account({
              accountName: item.account_name,
            });
            await userAccount.save();
            console.log(`Saved user account ${item.account_name} successfully.`);
          }

          if (item.policy_number && item.policy_start_date && item.policy_end_date) {
            const policyInfo = new PolicyInfo({
              policyNumber: item.policy_number,
              policyStartDate: item.policy_start_date,
              policyEndDate: item.policy_end_date,
              policyCategoryId: savedCategory ? savedCategory._id : null,
              companyCollectionId: savedCarrier ? savedCarrier._id : null,
              userId: savedUser ? savedUser._id : null,
            });
            await policyInfo.save();
            console.log(`Saved policy info ${item.policy_number} successfully.`);
          }

        } catch (error) {
          console.error("Error saving item:", error);
        }
      }
    }    
    await saveDataToDatabase(data);
    return returnJsonResponse("File uploaded successfully", 200);

  } catch (err) {
    console.error("Unexpected error:", err);
    return returnJsonResponse("Unexpected Error", 400, err.message);
  }
};
