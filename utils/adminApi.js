import Cookies from "js-cookie";
import api from "./apiIntercepter";

// Login function
export const login = async (email, password) => {
  try {
    // Make login request to your backend
    const response = await api.post(
      "/admin/admin-login",
      { email, password },
      { withCredentials: true }
    );

    // Extract tokens and user data
    const { accessToken, admin } = response.data;

    // Store token in cookies
    Cookies.set("accessToken", accessToken, { expires: 1 }); // Set expiration as needed

    return admin; // Optionally return the admin/user data to update UI state
  } catch (error) {
    console.error("Login failed:", error.response.data.error);
    throw new Error(error.response.data.error);
  }
};

export const logout = async () => {
  try {
    // Optionally call the logout API to invalidate refresh token
    await api.post("/admin-logout"); // Make sure your backend handles this to clear refresh tokens on server side

    // Clear token and user data from cookies
    Cookies.remove("accessToken");
  } catch (error) {
    console.error("Logout failed:", error);
    // Even if logout fails, proceed to clear tokens and redirect
    Cookies.remove("accessToken");
    window.location.href = "/login";
  }
};
