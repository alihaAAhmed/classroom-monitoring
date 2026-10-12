import { createContext, useContext, useState, useEffect } from "react";
import {
  loginUser,
  logoutUser,
  getCurrentUser,
  verifyToken,
} from "../services/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      const stored = getCurrentUser();
      if (stored) {
        setUser(stored);
        try {
          const result = await verifyToken();
          if (result.success) {
            setUser(result.user);
          } else {
            setUser(null);
          }
        } catch {
          setUser(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  // Login
  const login = async (username, password) => {
    const result = await loginUser(username, password);
    if (result && result.success) {
      setUser(result.user);
    }
    return result;
  };

  // Logout
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  // ⚡ NEW: Manual user setter (for direct login bypass)
  const setUserManually = (userData) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setUserManually,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);