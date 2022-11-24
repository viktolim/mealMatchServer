require("../schemas/UserSchema");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");

require("dotenv").config();
const requireAuth = require("../middlewares/requireAuth");

const app = express();
mongoose.connect(
  process.env.MONGO_DB_URL +
    process.env.MONGO_DB_USERNAME +
    process.env.MONGO_DB_PASSWORD +
    process.env.MONGO_DB_URL_ENDPOINT
);
app.use(bodyParser.json());
app.use(authRoutes);

mongoose.connection.on("error", (err) => {});

app.get("/", requireAuth, (req, res) => {
  res.status(200).send({ message: "you sign up" });
});
app.post("/", (req, res) => {});
app.listen(process.env.SERVER_DB_PORT, () => {
  console.log("Listening on port 3000");
});
