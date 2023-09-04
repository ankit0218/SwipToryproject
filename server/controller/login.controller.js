const ErrorHandler = require("../config/customHandler.config");
const user=require("../repo/user.repo");
const bcrypt=require("bcryptjs");
const login=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        let userData=new user()
        userData=await userData.checkUser(email);
        bcrypt.compare(password,userData.password,(err,success)=>{
            if(err)
            {
                next(new ErrorHandler('Unauthorized User',401))
            }
            else if(success){
                req.userInfo={
                    email:userData.email,
                    userName:userData.userName,
                    uid:userData.id
                }
                next()
            }
        })
    }
    catch(err){
        next(new ErrorHandler());
    }
}
module.exports=login