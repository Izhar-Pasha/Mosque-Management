import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  year: { type: String, required: [true, "Year is required"] },
  branch: { type: String, required: [true, "Branch is required"] },
  collegeName: {
    type: String,
    required: [true, "College Name is required"],
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

export const Student = mongoose.model("Student", studentSchema);
