const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    userName:{type:String,required:true},
    password:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
})
module.exports=mongoose.model("user",userSchema)
