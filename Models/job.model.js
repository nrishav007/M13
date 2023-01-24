const mongoose=require("mongoose");
const JobSchema=mongoose.Schema({
    comp_name:String,
    position:String,
    contract:String,
    location:String
});
const masaiJobModel=mongoose.model("masaijob",JobSchema);
module.exports=masaiJobModel;