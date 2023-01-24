const express=require("express");
const alljobs = require("../Models/job.model");
const job=express.Router();
job.use(express.json());

job.get("/",async(req,res)=>{
    res.send(await alljobs.find());

});

job.post("/create",async(req,res)=>{
    await alljobs.create(req.body);
    res.send({msg:"Job Added"});
});
job.delete("/removejob/:id",async(req,res)=>{
    const job_id=req.params.id;
    await alljobs.findOneAndDelete({_id:job_id});
    res.send({msg:"Job Removed"});
});
module.exports=job;