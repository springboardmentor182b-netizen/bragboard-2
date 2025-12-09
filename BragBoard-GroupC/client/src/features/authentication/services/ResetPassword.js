import axios from "axios";

export const resetPassword = async (email, newPassword) => {
  const response = await axios.post(
    "http://localhost:5000/auth/reset-password",
    { email, newPassword }
  );
  return response.data;
};
