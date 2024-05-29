const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  }, {
    timestamps: true,
  });
  
  const User = mongoose.model('User', UserSchema);
  module.exports = User;
  