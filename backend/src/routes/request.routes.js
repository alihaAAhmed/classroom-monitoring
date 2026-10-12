import express from "express";
import {
  getRequests,
  getRequestsByTeacher,
  createRequest,
  updateRequestStatus,
  deleteRequest,
} from "../controllers/request.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getRequests);
router.get("/teacher/:name", protect, getRequestsByTeacher);
router.post("/", protect, createRequest);
router.put("/:id", protect, adminOnly, updateRequestStatus);
router.delete("/:id", protect, deleteRequest);

export default router;