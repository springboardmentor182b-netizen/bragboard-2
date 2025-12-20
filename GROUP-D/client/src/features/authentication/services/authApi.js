import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export async function signupApi(data) {
  const res = await axios.post(`${API_BASE}/auth/signup`, data);
  return res.data; // { access_token, token_type }
}

export async function loginApi(data) {
  const res = await axios.post(`${API_BASE}/auth/login`, data);
  return res.data;
}

export async function forgotPasswordApi(email) {
  const res = await axios.post(`${API_BASE}/auth/forgot-password`, { email });
  return res.data;
}

export async function verifyOtpApi(email, otp) {
  const res = await axios.post(`${API_BASE}/auth/verify-otp`, { email, otp });
  return res.data;
}

export async function resetPasswordApi(email, otp, newPassword) {
  const res = await axios.post(`${API_BASE}/auth/reset-password`, {
    email,
    otp,
    new_password: newPassword,
  });
  return res.data;
}
