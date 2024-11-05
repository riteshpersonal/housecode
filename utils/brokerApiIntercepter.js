import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api", // Base URL for your backend API
  withCredentials: true, // To include cookies like refresh tokens in requests
});

// Add a request interceptor to attach the access token
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle access token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to access token expiration
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent retry loop

      // Try refreshing the token
      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          // Update the authorization header and retry the original request
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Failed to refresh token", refreshError);
        // Handle refresh failure (e.g., log out the user)
        logout();
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const response = await axios.post("/api/broker-refresh-token", {
      withCredentials: true,
    });

    const { accessToken } = response.data;

    // Update tokens in localStorage
    localStorage.setItem("accessToken", accessToken);

    return accessToken;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};


export default api;
