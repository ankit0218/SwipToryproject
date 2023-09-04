const mongoose=require("mongoose")
const bookmarkSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true}, 
    storyId:{type:mongoose.Schema.Types.ObjectId,ref:'storie',required:true}, 
    isBookmarked:{type:Boolean,required:true,default:true}
},{timestamps:true});
module.exports=mongoose.model("bookmarks",bookmarkSchema);