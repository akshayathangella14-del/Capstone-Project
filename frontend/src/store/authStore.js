import { create } from "zustand";
import axios from "axios";

export const useAuth = create((set) => ({
  currentUser: null,
  loading: false,
  isAuthenticated: false,
  error: null,
login: async (userCred) => {
    try {
      set({ loading: true, currentUser: null, isAuthenticated: false, error: null });

      let res = await axios.post(
        "https://capstone-project-bhy0.onrender.com/auth/login",
        userCred,
        { withCredentials: true }
      );

      if (res.status === 200) {
        // ✅ SAVE TOKEN TO LOCAL STORAGE
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }

        set({
          currentUser: res.data?.payload,
          loading: false,
          isAuthenticated: true,
          error: null,
        });
      }
    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.message || "Login failed",
      });
    }
  },

  logout: async () => {
    try {
      await axios.get("https://capstone-project-bhy0.onrender.com/auth/logout", { withCredentials: true });
      
      // ✅ REMOVE TOKEN ON LOGOUT
      localStorage.removeItem("token");

      set({ currentUser: null, isAuthenticated: false, error: null, loading: false });
    } catch (err) {
      set({ loading: false, isAuthenticated: false, currentUser: null });
    }
  },
  // restore login
  checkAuth: async () => {
    try {
      set({ loading: true });
      const res = await axios.get("https://capstone-project-bhy0.onrender.com/auth/check-auth", { withCredentials: true });

      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err) {
      // If user is not logged in → do nothing
      if (err.response?.status === 401) {
        set({
          currentUser: null,
          isAuthenticated: false,
          loading: false,
        });
        return;
      }

      // other errors
      console.error("Auth check failed:", err);
      set({ loading: false });
    }
  },
}));