import mongoose from "mongoose";
var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


var Schema = mongoose.Schema;
var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  displayName: String,
  bio: String
}, {
  timestamps: true
});

var noop = function () {};

userSchema.pre("save", function (next) {
  var user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
      user.password = hashedPassword;
      this.updatedAt = Date.now();
      next();
    });
  });
});

userSchema.methods.checkPassword = function (guess, cb) {
  bcrypt.compare(guess, this.password, function (err, isMatch) {
    cb(err, isMatch);
  });
};

userSchema.methods.name = function () {
  return this.displayName || this.username;
};

const User = mongoose.model("user", userSchema);
module.exports = User;
