import { rooms as localRooms, getRoomById as getLocalRoomById } from "../data/rooms";
import { apiRequest } from "./api";

// Get all rooms — Demo: local data
export const getAllRooms = async () => {
  // Demo mode
  return localRooms;

  // Real API (baad mein)
  // return await apiRequest("/rooms");
};

// Get room by ID — Demo: local data
export const getRoom = async (id) => {
  // Demo mode
  return getLocalRoomById(id);

  // Real API
  // return await apiRequest(`/rooms/${id}`);
};

// Filter rooms by status
export const getRoomsByStatus = async (status) => {
  return localRooms.filter((r) => r.status === status);
};

// Get available rooms
export const getAvailableRooms = async () => {
  return localRooms.filter((r) => r.status === "available" && r.cameraOnline);
};