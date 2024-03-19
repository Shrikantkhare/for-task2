const mongoose= require("mongoose")
const productSchema=mongoose.Schema({
    user_id:{
        type:String,
        require:true,
        default:""
    },
    product_name:{
        type:String,
        require:true,
        default:""
    },
    price:{
        type:String,
        require:true,
        default:""
    },
    type:{
        type:String,
        require:true,
        default:""
    },
})
module.exports=mongoose.model("product",productSchema)