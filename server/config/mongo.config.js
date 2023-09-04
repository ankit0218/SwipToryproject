const mongoose=require("mongoose");
module.exports=mongoose.connect("mongodb://127.0.0.1:27017/swiptory").then(()=>{
    console.log("db connected");
});

