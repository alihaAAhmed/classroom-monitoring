import { notifications as localNotifications } from "../data/notifications";
import { apiRequest } from "./api";

// Get all notifications
export const getAllNotifications = async () => {
  return localNotifications;

  // Real API (baad mein)
  // return await apiRequest("/notifications");
};

// Get unread count
export const getUnreadCount = async () => {
  return localNotifications.filter((n) => n.unread).length;
};

// Mark as read
export const markAsRead = async (id) => {
  // Demo mode — yahan kuch nahi karta
  return { success: true };
};

// Mark all as read
export const markAllAsRead = async () => {
  return { success: true };
};