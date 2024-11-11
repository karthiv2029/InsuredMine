const mongoose = require("mongoose");
const AgentSchema = require("../schema/agentSchema").AgentSchema;
const Agent = mongoose.model("Agent",AgentSchema);
const returnJsonResponse = require("../utils/helper").returnJsonResponse;