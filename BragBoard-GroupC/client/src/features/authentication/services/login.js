import axios from "axios";

export const login = async (email, password) => {
  const form = new URLSearchParams();
  form.append("username", email);
  form.append("password", password);

  const res = await axios.post("http://localhost:8000/auth/token", form, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  
  localStorage.setItem("token", res.data.access_token);

  return res.data;
};


