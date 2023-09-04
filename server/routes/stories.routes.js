const {Router}=require('express');
const newStories = require('../controller/newStories.controller');
const mystories = require('../controller/mystories.controller');
const story = require('../controller/story.controller');
const storyUpdate = require('../controller/storyUpdate.controller');
const likeStory=require("../controller/likeStory.controller");
const StoryInfo=require("../controller/userStoryInfo.controller");
const bookmarks = require('../controller/bookmark.controller');
const bookmarked = require('../controller/bookmarked.controller');
const routes=Router();
routes.post("/create",newStories);
routes.get("/mystories",mystories);
routes.get("/story",story);
routes.put("/update",storyUpdate);
routes.put("/like",likeStory)
routes.get("/story/details",StoryInfo);
routes.route("/bookmarks").get(bookmarked).put(bookmarks)
module.exports=routes;