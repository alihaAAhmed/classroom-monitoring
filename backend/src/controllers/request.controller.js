import Request from "../models/Request.js";

// @desc  Get all requests
// @route GET /api/requests
export const getRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get requests by teacher name
// @route GET /api/requests/teacher/:name
export const getRequestsByTeacher = async (req, res) => {
  try {
    const requests = await Request.find({ teacher: req.params.name }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Create request
// @route POST /api/requests
export const createRequest = async (req, res) => {
  try {
    const request = await Request.create(req.body);
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Update request status (Admin)
// @route PUT /api/requests/:id
export const updateRequestStatus = async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status, adminNote },
      { new: true }
    );
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Delete request
// @route DELETE /api/requests/:id
export const deleteRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.json({ message: "Request removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};