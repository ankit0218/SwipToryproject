const userRepo = require("../repo/user.repo");
const userData=async(req,res,next)=>{
    const {uid}=req.userInfo;
    let user=new userRepo();
    user=await user.getUser(uid);
    res.status(200).json(user);
}
module.exports=userData;