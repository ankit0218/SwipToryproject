const stories = require("../model/stories.model");
class Stories {
  async newStories(id, storyData) {
    const story=new stories({
      createdBy:id,
      ...storyData
    })
    return story.save();
  }
  async getMyStories(id, limit,category) {
    if(category==="All")
    {
      return stories.find({createdBy:id}).sort({createdTimeStamp:-1}).limit(limit);
    }
    else{
      return stories.find({Category:category,createdBy:id}).sort({createdTimeStamp:-1}).limit(limit);

    }
  }
  async updateStory(pid,uid,story){
    return stories.findOneAndUpdate({_id:pid,createdBy:uid},{$set:{story:story}},{new:true})
  }
  async getStories(limit,category){
    if(category==="All")
    {
      return stories.find().sort({createdTimeStamp:-1}).limit(limit);
    }
    else{
      return stories.find({Category:category}).sort({createdTimeStamp:-1}).limit(limit);  
    }
  }
  async getStory(pid,uid){
    return stories.findOne({_id:pid,createdBy:uid})
  }
  async getStoryData(pid){
    return stories.findById(pid,{createdAt:0,updatedAt:0,__v:0,category:0,createdBy:0,Category:0,createdTimeStamp:0,_id:0});
  }
}
module.exports = Stories;
