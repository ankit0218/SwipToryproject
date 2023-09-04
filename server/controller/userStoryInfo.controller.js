const Likes = require('../repo/Likes.repo');
const ErrorHandler=require("../config/customHandler.config");
const Bookmark = require('../repo/Bookmark.repo');
const user_StoryInfo=async(req,res,next)=>{
    try{
        const {uid}=req.userInfo;
        const {sid,data}=req.query;
        let result=decodeURIComponent(data)
        result=JSON.parse(result);
        const likes=new Likes();
        const bookmark=new Bookmark();
        let storyLikedByUser=await likes.storyUserLiked(sid,uid);
        let bookmarked=await bookmark.getIsBookmarked(uid,sid)
        if(bookmarked?.isBookmarked){
            bookmarked=true;
        }
        else{
            bookmarked=false;
        }
        if(storyLikedByUser){
            storyLikedByUser=storyLikedByUser.liked;
        }
        else{
            storyLikedByUser=0
        }
        res.status(200).json({...result,liked:storyLikedByUser,BookMarked:bookmarked})
    }
    catch(err){
        console.log(err);
        next(new ErrorHandler())
    }
}
module.exports=user_StoryInfo;