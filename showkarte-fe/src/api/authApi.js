import apiClient from "./apiClient";

export const registerUser = (registerRequest) => {
  return apiClient.post("/auth/register", registerRequest);
};
