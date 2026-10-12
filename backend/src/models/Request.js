import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    teacher: { type: String, required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    roomId: { type: Number, required: true },
    roomName: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    students: { type: Number, required: true },
    purpose: { type: String, required: true },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    submitted: { type: String, default: () => new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) },
    adminNote: { type: String, default: "" },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);
export default Request;