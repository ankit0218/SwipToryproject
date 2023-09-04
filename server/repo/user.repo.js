const user=require("../model/user.model");
class userRepo{
    async checkUser(email){
        return user.findOne({email});
    }
    async newUser(email,userName,password){
        const UserData=new user({
            email,
            userName,
            password
        })
        return UserData.save()
    }
    async getUser(uid){
        return user.findById(uid,{email:1,userName:1,_id:0})
    }
}
module.exports=userRepo;