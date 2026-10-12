import { apiRequest } from "./api";

// ═══════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════
export const loginUser = async (username, password) => {
  console.log("🔐 LOGIN START:", username);

  try {
    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    console.log("✅ LOGIN SUCCESS:", data);

    if (data.token) {
      localStorage.setItem("cms_token", data.token);
      localStorage.setItem("cms_user", JSON.stringify(data));
    }

    return { success: true, user: data };
  } catch (error) {
    console.error("❌ LOGIN FAILED:", error);
    return { success: false, message: error.message || "Login failed" };
  }
};

// ═══════════════════════════════════════════════
// SIGNUP
// ═══════════════════════════════════════════════
export const signupUser = async (userData) => {
  try {
    const data = await apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    return { success: true, user: data };
  } catch (error) {
    console.error("❌ SIGNUP FAILED:", error);
    return { success: false, message: error.message };
  }
};

// ═══════════════════════════════════════════════
// LOGOUT
// ═══════════════════════════════════════════════
export const logoutUser = () => {
  localStorage.removeItem("cms_user");
  localStorage.removeItem("cms_token");
};

// ═══════════════════════════════════════════════
// GET CURRENT USER
// ═══════════════════════════════════════════════
export const getCurrentUser = () => {
  const stored = localStorage.getItem("cms_user");
  return stored ? JSON.parse(stored) : null;
};

// ═══════════════════════════════════════════════
// VERIFY TOKEN
// ═══════════════════════════════════════════════
export const verifyToken = async () => {
  try {
    const data = await apiRequest("/auth/me");
    return { success: true, user: data };
  } catch (error) {
    console.error("Token verify error:", error);
    logoutUser();
    return { success: false, message: error.message };
  }
};