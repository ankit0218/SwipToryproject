const mongoose=require("mongoose");

const stories=new mongoose.Schema({
        id:{type:Number,require:true},
        Image:{type:String,required:true},
        Heading:{type:String,required:true},
        lastUpdatedAt:{type:Date,required:true,default:Date.now},
        Description:{type:String,required:true},
    },{timestamps:true})
    
    
    const storieSchema=new mongoose.Schema({
        createdBy:{type:String,required:true},
        createdTimeStamp:{type:Number,required:true,default:Date.now()},
        Category:{type:String,enum:['food','health and fitness','travel','movie','education'],require:true},
    story:[stories] 
        },
    {
        timestamps:true
    }
    )
module.exports=mongoose.model('storie',storieSchema);