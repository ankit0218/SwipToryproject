const ErrorHandler = require("../config/customHandler.config");
const bookmarkdb=require("../model/bookmark.model")
const bookmarked=async(req,res,next)=>{
    try{
        const {uid}=req.userInfo;
        const data=await bookmarkdb.find({userId:uid,isBookmarked:true},{createdAt:0,isBookmarked:0,updatedAt:0,userId:0,__v:0}).populate('storyId');
        let result=data.map((item)=>item.storyId)
        res.status(200).json(result)
    }
    catch(err){
        next(new ErrorHandler());
    }
}
module.exports=bookmarked;