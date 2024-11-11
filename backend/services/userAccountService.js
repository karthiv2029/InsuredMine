const mongoose = require("mongoose");
const UserAccountSchema = require("../schema/userAccountSchema").UserAccountSchema;
const Users_Account = mongoose.model("Users_Account",UserAccountSchema);
const returnJsonResponse = require("../utils/helper").returnJsonResponse;
