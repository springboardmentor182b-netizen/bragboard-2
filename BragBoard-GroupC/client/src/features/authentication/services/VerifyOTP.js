import axios from "axios";

export const verifyOtp = async (email, otp) => {
  const response = await axios.post(
    "http://localhost:5000/auth/verify-otp",
    { email, otp }
  );
  return response.data;
};
