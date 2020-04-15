var mongoose=require("mongoose");
var plmongoose=require("passport-local-mongoose");
var userschema=new mongoose.Schema({
    username: String,
    password: String,
    salary:Number,
    shift:String
});
userschema.plugin(plmongoose);
module.exports= mongoose.model("user",userschema);