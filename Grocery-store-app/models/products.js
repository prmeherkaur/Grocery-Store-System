var mongoose =require("mongoose");
var prodschema=new mongoose.Schema({
    name:String,
    image: String,
    description: String,
    author: {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        username:String
    },
    price: Number,
    qty: Number,
    threshold: Number

});
module.exports=mongoose.model("prod",prodschema);