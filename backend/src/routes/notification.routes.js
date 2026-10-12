import express from "express";
import {
  getNotifications,
  createNotification,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notification.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getNotifications);
router.post("/", protect, createNotification);
router.put("/read-all", protect, markAllAsRead);
router.delete("/:id", protect, deleteNotification);

export default router;