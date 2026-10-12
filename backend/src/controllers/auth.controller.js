import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// ═══════════════════════════════════════════════
// SIGNUP
// ═══════════════════════════════════════════════
export const signup = async (req, res) => {
  try {
    const { username, email, password, name, role, department } = req.body;

    // ✅ Prevent admin signup via API (security)
    if (role === "admin") {
      return res.status(403).json({
        message: "Admin accounts cannot be created through signup.",
      });
    }

    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const user = await User.create({
      username,
      email,
      password,
      name,
      initials,
      role,
      department: department || "",
      // ⭐ HYBRID LOGIC:
      // Student → active (instant login)
      // Teacher → pending (admin approval needed)
      status: role === "student" ? "active" : "pending",
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      initials: user.initials,
      role: user.role,
      status: user.status,
      message:
        role === "student"
          ? "Signup successful! You can login now."
          : "Signup successful! Please wait for admin approval.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ═══════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Check password FIRST
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Admin bypass status check (always active)
    if (user.role !== "admin") {
      if (user.status === "pending") {
        return res.status(403).json({
          message: "Account pending admin approval",
        });
      }
      if (user.status === "rejected") {
        return res.status(403).json({
          message: "Account rejected by admin",
        });
      }
    }

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      initials: user.initials,
      role: user.role,
      status: user.status,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ═══════════════════════════════════════════════
// GET CURRENT USER
// ═══════════════════════════════════════════════
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};