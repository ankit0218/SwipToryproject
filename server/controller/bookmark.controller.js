const ErrorHandler = require('../config/customHandler.config');
const Bookmark=require('../repo/Bookmark.repo')
const bookmarks=async(req,res,next)=>{
    try{
        const {uid}=req.userInfo;
        const {storyId,isBookmarked=false}=req.body;
        const bookmark=new Bookmark()
        const data=await bookmark.bookmarkPost(uid,storyId,isBookmarked)
        if(data.id){
            res.status(200).json({msg:"success"});
        }
    }
    catch(err){
        new ErrorHandler();
    }
}
module.exports=bookmarks;