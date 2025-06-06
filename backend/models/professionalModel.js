import mongoose from "mongoose";

const professionalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
  },
  company: {
    type: String,
    required: [true, "Company is required"],
  },
  contact: {
    type: Number,
    required: [true, "Phone number is required"],
    validate: {
      validator: function (v) {
        return v.toString().length === 10;
      },
      message: "Phone number must be exactly 10 digits",
    },
  },
  landmark: {
    type: String,
    required: [true, "Landmark is required"],
  },
  waqt: {
    type: String,
    enum: ["0", "3", "5", "10", "40", "4", "Behroon"],
    required: [true, "Waqt is required"],
    default: "0",
  },
});

export const Professional = mongoose.model("Professional", professionalSchema);
