import axios from "axios";
import Cookies from "js-cookie";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // To include cookies in requests
});

// Add a request interceptor to attach the access token
api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken"); // Get token from cookies
    console.log("accessToken :", accessToken,Cookies.get())
    // if (accessToken) {
      config.headers["Authorization"] = `Bearer `;
    // }
    return config;
  },
  (error) => Promise.reject(error.message)
);

// Add a response interceptor to handle access token expiration
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Check if the error is due to access token expiration
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // Prevent retry loop

//       // Try refreshing the token
//       // try {
//       //   const newAccessToken = await refreshAccessToken();
//       //   if (newAccessToken) {
//       //     // Update the authorization header and retry the original request
//       //     originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//       //     return api(originalRequest);
//       //   }
//       // } catch (refreshError) {
//       //   console.error("Failed to refresh token", refreshError.message);
//       //   // Handle refresh failure (e.g., log out the user)
//       //   logout();
//       //   throw refreshError.message;
//       // }
//     }

//     return Promise.reject(error.message);
//   }
// );

// Function to refresh the access token
// const refreshAccessToken = async () => {
//   try {
//     const response = await axios.post("/api/admin-refresh-token", {
//       withCredentials: true,
//     });

//     const { accessToken } = response.data;

//     // Update token in cookies
//     Cookies.set("accessToken", accessToken, { expires: 1 }); // Set expiration as needed

//     return accessToken;
//   } catch (error) {
//     console.error("Token refresh failed:", error.message);
//     return null;
//   }
// };

export default api;
