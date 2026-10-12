import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    building: { type: String, required: true },
    floor: { type: String, required: true },
    capacity: { type: Number, required: true },
    occupancy: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["available", "occupied", "inuse", "offline"],
      default: "available",
    },
    cameraId: { type: String, default: "" },
    cameraOnline: { type: Boolean, default: true },
    image: { type: String, default: null },
    lastUpdated: { type: String, default: "just now" },
    schedule: [
      {
        time: String,
        subject: String,
        teacher: String,
        state: String,
      },
    ],
    activity: [
      {
        time: String,
        text: String,
        color: String,
      },
    ],
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;