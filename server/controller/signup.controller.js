require("dotenv").config();
const ErrorHandler = require("../config/customHandler.config");
const bcrypt=require("bcryptjs");
const userRepo = require("../repo/user.repo");
const signup=async(req,res,next)=>{
    try{
        const {email,userName,password}=req.body;
        const hashPassport=await bcrypt.hash(password,10);
        let userData=new userRepo();
        userData=await userData.newUser(email,userName,hashPassport)
        req.userInfo={email:userData.email,userName:userData.userName,uid:userData.id};
        next();
    }
    catch(err){
        console.log({err});
        next(new ErrorHandler())
    }
}
module.exports=signup;