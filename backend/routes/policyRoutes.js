var express = require('express');
var router = express.Router();
var policyCarrierController = require("../controller/policyCarrierController");
var policyCategoryController = require("../controller/policyCategoryController");
var policyInfoController = require("../controller/policyInfoController");

router.get('/search-policy',policyInfoController.filterPolicy);

router.get('/aggregated-policy',policyInfoController.aggregatedPolicy);

module.exports = router;