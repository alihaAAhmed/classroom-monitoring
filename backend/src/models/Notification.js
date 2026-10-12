import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["red", "blue", "green", "orange", "gray"],
      default: "blue",
    },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    time: { type: String, default: "just now" },
    unread: { type: Boolean, default: true },
    tag: { type: String, default: "" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;