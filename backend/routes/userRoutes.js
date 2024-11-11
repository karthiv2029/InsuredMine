var express = require('express');
var router = express.Router();
var userAccountController = require("../controller/userAccountController");
var userController = require("../controller/userController");
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    cb(null, originalName); 
  }
});

const upload = multer({ storage: storage });  

router.post('/upload',upload.single('file'),userController.uploadCSVFile);

module.exports = router;
