const ErrorHandler = require('../config/customHandler.config');
const Likes=require('../repo/Likes.repo')
const likeStory=async(req,res,next)=>{
    try{
        const {uid}=req.userInfo;
        const {sid,liked=false}=req.body;
        const likes=new Likes();
        const data=await likes.updateLikes(sid,uid,liked)
        res.status(200).send({data})
    }
    catch(err){
        next(new ErrorHandler());
    }
}   
module.exports=likeStory