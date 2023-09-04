const {Router}=require("express");
const routes=Router();
const stories=require("../controller/stories.controller");
const details = require("../controller/details.controller");
routes.get("/",stories)
routes.get("/details",details)
module.exports=routes;