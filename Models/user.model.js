const mongoose=require("mongoose");
const UserSchema=mongoose.Schema({
    email:String,
    password:String,
    name:String
});
const masaiUserModel=mongoose.model("masaiuser",UserSchema);
module.exports=masaiUserModel;