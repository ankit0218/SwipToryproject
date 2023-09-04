const ErrorHandler = require("../config/customHandler.config")

const logout=(req,res)=>{
    try{
        res.cookie("atoken",'',{maxAge:0})
        res.cookie("rtoken",'',{maxAge:0})
        res.status(200).json({
            msg:"Success"
        })
    }
    catch(err){
        console.log(err);
        next(new ErrorHandler())
    }
}
module.exports=logout;