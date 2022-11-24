const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

const express = require("express");
const { restart } = require("nodemon");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const { username, email, password, firstName, lastName } = req.body;
  try {
    const user = new User({ username, email, password, firstName, lastName });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.MY_SECRET_KEY);
    res.send({ token });
  } catch (error) {
    return res.status(422).send(error.message);
  }
  next();
});

router.post("/login", async (req, res, next) => {
  const { password, username } = req.body;
  console.log(password, username);
  try {
    const user = await User.findOne({ username });
    if (await user.comparePassword({ password })) {
      const token = jwt.sign({ userId: user._id }, process.env.MY_SECRET_KEY);
      res.send({ token });
    } else {
      throw { message: "bad password" };
    }
  } catch (err) {
    res.status(422).send(err.message);
  }
  next();
});
module.exports = router;
