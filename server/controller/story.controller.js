const Stories=require("../repo/stories.repo")
const ErrorHandler = require("../config/customHandler.config");
const story=async(req,res,next)=>{
    try{

        const {pid}=req.query;
        const {uid}=req.userInfo;
        const stories=new Stories();
        const data=await stories.getStory(pid,uid);
        res.status(200).json(data);
    }
    catch(err){
        next(new ErrorHandler())
    }

}
module.exports=story;