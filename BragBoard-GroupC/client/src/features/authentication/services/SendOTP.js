import axios from "axios";

export const sendOtp = async (email) => {
  const response = await axios.post(
    "http://localhost:5000/auth/forgot-password",
    { email }
  );
  return response.data;
};
