import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "UserName is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

export const User = mongoose.model("User", userSchema);
