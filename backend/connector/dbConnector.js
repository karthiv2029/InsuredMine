const mongoose = require("mongoose");
require('dotenv').config();
const connectDB = async() => {
   try{
    console.log(process.env.MONGODB_URI)
     const connection = await mongoose.connect(process.env.MONGODB_URI,{
      useNewUrlParser: true, 
      useUnifiedTopology: true
     });
     mongoose.set('debug',true);
     console.log(`MongoDB Connected: ${connection.connection.host}`)
   }catch(err){
        console.log(err);
        process.exit(1);
   } 
}
module.exports = connectDB;