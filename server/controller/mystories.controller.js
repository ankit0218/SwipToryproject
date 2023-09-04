const ErrorHandler = require("../config/customHandler.config");
const Stories = require("../repo/stories.repo");
const mystories=async(req,res,next)=>{
    try{
        const {limit=1,category=""}=req.query
        const {uid}=req.userInfo;
        let stories=new Stories();
        storyData=await stories.getMyStories(uid,limit,category);
        const data=[];
        storyData.map((item)=>{
            let datum={...item._doc}
            data.push({...datum,story:item.story[0]})
        })
        if(storyData.length>0)
        {
            res.status(200).send(data)
        }
        else{
            next(new ErrorHandler("no story found",404))
        }
    }
    catch(err){
        console.log(err);
        next(new ErrorHandler())
    }
}
module.exports=mystories;