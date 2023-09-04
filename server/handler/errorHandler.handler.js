const errorHandler=(err,req,res,next)=>{
    err.status=err.status || 500;
    err.message=err.message || "Server Internal Error";
    res.status(err.status).json({
        success:false,
        msg:err.message
    })
}
module.exports=errorHandler;