
const mongoose= require("mongoose");

const { float } = require("webidl-conversions");

const Schema= mongoose.Schema;

const flightSchema=new Schema({
    
  
    origin:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    departure:{
        type:String,
        required:true
    },
    arrival:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    imgurl:{
            type:String,
            
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
       
    },
   
    

},{
    timestamps:true
})



module.exports=mongoose.model("Flight",flightSchema)