const mongoose = require("mongoose");
const PolicyCarrierSchema = require("../schema/policyCarrierSchema").PolicyCarrierSchema;
const PolicyCarrier = mongoose.model("Policy_Carrier",PolicyCarrierSchema);
const returnJsonResponse = require("../utils/helper").returnJsonResponse;