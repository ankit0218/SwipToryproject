const Stories=require("../repo/stories.repo")
const stories=async(req,res,next)=>{
    const {category="",limit=5}=req.query;
    let stories=new Stories();
    stories=await stories.getStories(limit,category);
    const data=[];
    stories.map((item)=>{
        let datum={...item._doc}
        data.push({...datum,story:item.story[0]})
    })
    res.status(200).send(stories);
}
module.exports=stories;