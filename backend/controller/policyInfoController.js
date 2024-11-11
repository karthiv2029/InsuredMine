const policyInfoServices = require("../services/policyInfoService");
const returnJsonResponse = require("../utils/helper").returnJsonResponse;


module.exports.filterPolicy = async function (req, res, next) {
    try {
      var connectorResponse = await policyInfoServices.filterPolicy(req.query.username);      
      if (connectorResponse) {
        res.status(connectorResponse.status).send(connectorResponse);
        return;
      }
    } catch (err) {
      console.log(err);
      res.status(400).send({ msg: "UnExpected Error" });
      return null;
    }
  };

  module.exports.aggregatedPolicy = async function (req, res, next) {
    try {
      var connectorResponse = await policyInfoServices.aggregatedPolicy();      
      if (connectorResponse) {
        res.status(connectorResponse.status).send(connectorResponse);
        return;
      }
    } catch (err) {
      console.log(err);
      res.status(400).send({ msg: "UnExpected Error" });
      return null;
    }
  };