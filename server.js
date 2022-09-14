const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userModel = require("./userModel");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

//routes
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const response = await userModel.find({ username });
    console.log(response.length);
    if (response.length >= 1) {
      return res
        .status(409)
        .json({ success: false, msg: "username already exists" });
    }
    const createUser = await userModel.create({
      username,
      password,
    });
    return res
      .status(200)
      .json({
        success: true,
        msg: "user has been created successfully!",
        createUser,
      });
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const findUsername = await userModel.find({ username });
  if (findUsername.length === 0) {
    return res.status(404).json({ success: false, msg: "username not found" });
  }

  if (findUsername[0].password == password) {
    return res.status(200).json({ success: true, msg: "user logged in", username:findUsername[0].username });
  } else {
    return res
      .status(400)
      .json({ success: false, msg: "password didnot match" });
  }
});

app.listen(8000, () => {
  console.log("server started");
  mongoose.connect("mongodb://localhost:27017/NewsApplicaiton", () => {
    console.log("connected to the database");
  });
});
