require("dotenv").config();
const userData=require("../model/user.model");
const jwt=require("jsonwebtoken");
const ErrorHandler = require("../config/customHandler.config");
const Token=(req,res,next)=>{
    try{
        const {email,userName,uid}=req.userInfo;
        const rtoken=jwt.sign({uid,email},process.env.REFRESH_TOKEN,{expiresIn:'30d'})
        const atoken=jwt.sign({uid,email},process.env.ACCESS_TOKEN,
        {expiresIn:'6h'});

        res.cookie('rtoken',`Bearer ${rtoken}`,{maxAge:1000*60*60*24*30});
        res.cookie('atoken',`Bearer ${atoken}`,{maxAge:1000*60*60*6});
        res.status(200).json({email,userName});
    }
    catch(err){
        console.log({err});
        next(new ErrorHandler());
    }
}
const verifyToken=(req,res,next)=>{
    let {atoken,rtoken}=req.cookies;
    rtoken=rtoken?.split(" ")[1];
    atoken=atoken?.split(" ")[1];
    if(atoken){
        jwt.verify(atoken,process.env.ACCESS_TOKEN,(err,data)=>{
            if(err){
                next(new ErrorHandler("Unable to verify user",403));
            }
            else{
                req.userInfo={uid:data.uid,email:data.email}
                next();
            }
        })
    }
    else if(!atoken && rtoken){
        jwt.verify(rtoken,process.env.REFRESH_TOKEN,async(err,data)=>{
            if(err){
                next(new ErrorHandler("Unable to verify user",403));
            }
            else{
                const {uid}=data;
                userData.findById(uid,{email:1}).then(result=>{
                    if(err){
                        next(new ErrorHandler())
                    }
                    else{
                        const {email}=result;
                        const atoken=jwt.sign({uid,email},process.env.ACCESS_TOKEN,{expiresIn:'6h'});
                        res.cookie('atoken',`Bearer ${atoken}`,{maxAge:1000*60*60*6});
                        req.userInfo={uid:data.uid,email:data.email}
                        next()
                    }
                }).catch(err=>{
                    console.log({err});
                    next(new ErrorHandler())
                })
            }
        })
    }
    else if(!atoken && !rtoken){
        next(new ErrorHandler("Unauthorized User",401))
    }
}
module.exports={Token,verifyToken};