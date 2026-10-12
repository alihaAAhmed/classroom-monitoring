import { getRequests, addRequest, updateRequestStatus, deleteRequest } from "../data/requests";
import { apiRequest } from "./api";

// Get all requests — Demo: localStorage
export const getAllRequests = async () => {
  return getRequests();

  // Real API (baad mein)
  // return await apiRequest("/requests");
};

// Get requests for a specific teacher
export const getRequestsByTeacher = async (teacherName) => {
  const all = getRequests();
  return all.filter((r) => r.teacher === teacherName);
};

// Create new request
export const createRequest = async (requestData) => {
  return addRequest(requestData);

  // Real API (baad mein)
  // return await apiRequest("/requests", {
  //   method: "POST",
  //   body: JSON.stringify(requestData),
  // });
};

// Approve request
export const approveRequest = async (id) => {
  updateRequestStatus(id, "approved");
  return { success: true };
};

// Reject request
export const rejectRequest = async (id) => {
  updateRequestStatus(id, "rejected");
  return { success: true };
};

// Cancel/delete request
export const cancelRequest = async (id) => {
  deleteRequest(id);
  return { success: true };
};