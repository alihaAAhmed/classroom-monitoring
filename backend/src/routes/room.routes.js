import express from "express";
import {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/room.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";
import Room from "../models/Room.js";

const router = express.Router();

router.get("/", getRooms);
router.get("/:id", getRoomById);
router.post("/", protect, adminOnly, createRoom);
router.put("/:id", protect, adminOnly, updateRoom);
router.delete("/:id", protect, adminOnly, deleteRoom);

// ═══════════════════════════════════════════════
// 🤖 PYTHON AI DATA UPDATE ROUTE
// ═══════════════════════════════════════════════
router.post("/demo/live-status", async (req, res) => {
  try {
    const { occupancy, status, cameraActive } = req.body;

    const updatedRoom = await Room.findOneAndUpdate(
      { name: "Room 101" }, 
      { 
        occupancy: occupancy,
        status: status,
        cameraOnline: cameraActive, 
        lastUpdated: "Just now (AI)"
      },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ message: "Room 101 not found in DB" });
    }

    res.json({ success: true, room: updatedRoom });
  } catch (error) {
    console.error("AI Update Error:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;