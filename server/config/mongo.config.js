const mongoose=require("mongoose");
module.exports=mongoose.connect("mongodb+srv://ankitattri1802:ankit123@database1.wxy2ddm.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("db connected");
});

