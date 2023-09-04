const bookmark=require("../model/bookmark.model");
class Bookmark{
    async bookmarkPost(uid,storyId,isBookmarked){
        return bookmark.findOneAndUpdate({userId:uid,storyId},{isBookmarked:isBookmarked},{upsert:true,new:true})
    }
    async getIsBookmarked(uid,sid){
        return bookmark.findOne({userId:uid,storyId:sid})
    }
}
module.exports=Bookmark