import axios from "axios";

export const login = async (email, password) => {
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);

  try {
    const res = await axios.post(
      "http://localhost:8000/auth/token",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    if (res.data.access_token) {
      localStorage.setItem("token", res.data.access_token);
    }
    return res.data;
  } catch (error) {
    console.error("LOGIN ERROR:", error.response?.data || error.message);
    throw error;
  }
};