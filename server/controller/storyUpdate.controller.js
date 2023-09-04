const Stories = require('../repo/stories.repo');
const storyUpdate=async(req,res,next)=>{
    const {pid,story}=req.body;
    const {uid}=req.userInfo;
    const stories=new Stories();
    const result=await stories.updateStory(pid,uid,story);
    res.status(200).send(result)
}
module.exports=storyUpdate;