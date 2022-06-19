const mongoose = require('mongoose')

const connectDB = async(req,res)=>{
   try {
        const connect = await mongoose.connect(process.env.DB_CONNECT,{
        useUnifiedTopology:true,
        useNewUrlParser:true,
    });
    console.log(`Connection to mongoDB was successfull ${connect.connection.host}`)
   } catch (error) {
      console.log(error) 
   }
    
}
module.exports = connectDB;