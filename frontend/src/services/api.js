// ⚡ Auto-detect API URL based on environment
const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "http://127.0.0.1:5000/api"
    : "https://classroom-monitoring-api.onrender.com/api");

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("cms_token");

  const config = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  if (options.body) {
    config.body = options.body;
  }

  const fullUrl = `${API_URL}${endpoint}`;
  console.log(`🌐 FETCH: ${config.method} ${fullUrl}`);

  try {
    const response = await fetch(fullUrl, config);
    console.log(`📥 STATUS: ${response.status}`);

    const data = await response.json();

    if (!response.ok) {
      console.error(`❌ RESPONSE ERROR:`, data);
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error(`❌ FETCH FAILED on ${endpoint}:`, error);
    console.error(`   URL was: ${fullUrl}`);
    throw error;
  }
};

export default API_URL;