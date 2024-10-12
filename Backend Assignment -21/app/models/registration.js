import mongoose from "mongoose";
const DataSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const RegistrationModel = mongoose.model("students", DataSchema);
export default RegistrationModel;
