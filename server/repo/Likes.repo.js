const likes=require('../model/likes.model')
class Likes{
    async updateLikes(sid,createdBy,liked){
        return likes.findOneAndUpdate({storyId:sid},{likedBy:createdBy,liked:liked},{upsert:true,new:true})
    }
    async storyLikes(sid){
        return likes.find({storyId:sid,liked:true})
    }
    async storyUserLiked(sid,uid){
        return likes.findOne({storyId:sid,likedBy:uid})
    }
}
module.exports=Likes