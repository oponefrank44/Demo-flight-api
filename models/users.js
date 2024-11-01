
const mongoose= require("mongoose");



const Schema= mongoose.Schema;

const passangerSchema=new Schema({
   firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
   email:{
        type:String,
        required:true
    },
    status:{
        type:String,
       default:"Novice"
    },
    password:{
        type:String,
        required:true
    },
    flight:[{
        type:Schema.Types.ObjectId,
        ref:"Flight"
    }],
   

})





module.exports=mongoose.model("User",passangerSchema)