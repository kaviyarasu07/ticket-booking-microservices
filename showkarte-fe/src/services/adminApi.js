import axiosInstance from "./axiosInstance";


export const getAdminDashboard = () => {
  return axiosInstance.get("/admin/dashboard");
};
