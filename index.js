const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const dbconnect = require("./Configs/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 6000;
env.config();
const masaiuser = require("./Models/user.model");
const job = require("./Routes/job.route");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.post("/signup", async (req, res) => {
  try {
    let growdata = await masaiuser.find({ email: req.body.email });
    if (growdata.length > 0) {
      res.send({ msg: "you can not use this email for signup" });
    } else {
      bcrypt.hash(req.body.password, 4, async (err, hash) => {
        if (err) {
          res.send({ msg: "Something went wrong" });
        }
        req.body.password = hash;
        await masaiuser.create(req.body);
        res.send({ msg: "Signup Successful" });
      });
    }
  } catch (e) {
    console.log(e);
    res.send({ msg: "Failed to create new account" });
  }
});
app.post("/signin", async (req, res) => {
  try {
    let data = await masaiuser.find({ email: req.body.email });
    if (data.length <= 0) {
      res.send({ msg: "Account not found" });
    } else {
      bcrypt.compare(req.body.password, data[0].password, (err, result) => {
        if (err) {
          res.send({ msg: "Incorrect Password" });
        } else if (result) {
          jwt.sign({ userID: data[0]._id }, process.env.msec, (err, token) => {
            res.send({
              msg: "Account created",
              token: token,
            });
          });
        } else {
          res.send({ msg: "Invalid Data" });
        }
      });
    }
  } catch (e) {
    console.log(e);
    res.send({ msg: "Failed to signin" });
  }
});
app.use("/jobs",job)
app.listen(port, () => {
  dbconnect;
  console.log(`listening to http://localhost:${port}`);
});
