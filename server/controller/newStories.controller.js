const ErrorHandler = require("../config/customHandler.config");
const Stories = require("../repo/stories.repo");

const newStories=async(req,res,next)=>{
    try{
        const {uid}=req.userInfo;
        const storyData=req.body;
        let stories=new Stories();
        story=await stories.newStories(uid,storyData)
        res.status(200).json({msg:"Okk"})
    }
    catch(err){
        console.log(err);
        next(new ErrorHandler())
    }
}
module.exports=newStories;