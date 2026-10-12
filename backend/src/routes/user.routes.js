import express from "express";
import {
  getUsers,
  getPendingUsers,
  approveUser,
  rejectUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, getUsers);
router.get("/pending", protect, adminOnly, getPendingUsers);
router.put("/:id/approve", protect, adminOnly, approveUser);
router.put("/:id/reject", protect, adminOnly, rejectUser);
router.delete("/:id", protect, adminOnly, deleteUser);

export default router;