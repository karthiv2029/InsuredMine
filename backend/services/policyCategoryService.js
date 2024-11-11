const mongoose = require("mongoose");
const PolicyCategorySchema = require("../schema/policyCategorySchema").PolicyCategorySchema;
const PolicyCategory = mongoose.model("Policy_Category",PolicyCategorySchema);
const returnJsonResponse = require("../utils/helper").returnJsonResponse;