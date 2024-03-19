const mongoose= require("mongoose")
const userSchema=mongoose.Schema({
   
    name:{
        type:String,
        require:true,
        default:""
    },
    email:{
        type:String,
        require:true,
        default:""
    },
    role:{
        type:String,
        require:true,
        default:""
    },
    password:{
        type:String,
        require:true,
        default:""
    },
})
module.exports=mongoose.model("user",userSchema)