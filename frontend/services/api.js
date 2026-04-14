import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
});

export const registerUser = (payload) => api.post("/api/auth/register", payload);
export const loginUser = (payload) => api.post("/api/auth/login", payload);
export const getPricing = () => api.get("/api/pricing");
export const getStations = () => api.get("/api/stations");
export const planTrip = (payload) => api.post("/api/trip", payload);
export const getUserStats = (token) =>
  api.get("/api/user/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export default api;
