import axios from "axios";

export const login = async (email, password) => {
  const params = new URLSearchParams();
  params.append("username", email);
  params.append("password", password);

  const res = await axios.post(
    "http://127.0.0.1:8000/auth/token",
    params,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
  localStorage.setItem("access_token", res.data.access_token);
  return res.data;
};