const Story=require("../repo/stories.repo");
const likesdb=require("../model/likes.model");
const ErrorHandler=require("../config/customHandler.config");
const Likes = require("../repo/Likes.repo");
const details=async(req,res,next)=>{
    try{
        const {pid,auth}=req.query;
        const story=new Story();
        const likes=new Likes();
        const result=await story.getStoryData(pid);
        const totalLikes=await likes.storyLikes(pid);
        const data={...result._doc,likesCount:totalLikes.length}
        if(auth==='false'){
            res.status(200).send({...data,liked:false,BookMarked:false})
        }
        else{
            const jsonData=JSON.stringify(data);
            const encodedData=encodeURIComponent(jsonData);
            res.redirect(`/stories/story/details?sid=${pid}&data=${encodedData}`)
        }
    }
    catch(err){
        next(new ErrorHandler())
    }
}
module.exports=details;