const mongoose=require("mongoose")
const Likes=new mongoose.Schema({
    likedBy:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    storyId:{type:mongoose.Schema.Types.ObjectId,ref:"stories"},
    liked:{type:Boolean,required:true,default:true}
},{timestamps:true})
module.exports=mongoose.model("Like",Likes);
