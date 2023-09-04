require("dotenv").config();
require("./config/mongo.config");
const cookieParser=require("cookie-parser");
const errorHandler = require("./handler/errorHandler.handler");
const auth=require("./routes/auth.routes");
const express=require("express");
const cors=require('cors');
const { verifyToken } = require("./handler/token.handler");
const userData = require("./controller/userData.controller");
const app=express();
const port=process.env.PORT || 4000;
app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true,
}))
app.use(express.json());
app.use(cookieParser());
app.use("/auth",auth);
app.use("/story",require("./routes/story.routes"))
app.use(verifyToken);
app.get("/user",userData);
app.use("/stories",require("./routes/stories.routes"))
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`Server Running at port ${port}`);
})