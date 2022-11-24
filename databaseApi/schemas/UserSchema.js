const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userShema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

userShema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
userShema.methods.comparePassword = async function (candidatePassword) {
  const user = this;

  return new Promise((res, rej) => {
    bcrypt.compare(
      candidatePassword.password,
      user.password,
      function (err, results) {
        res(results);
      }
    );
  });
};
mongoose.model("User", userShema);
