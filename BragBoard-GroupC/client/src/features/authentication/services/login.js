import axios from "axios";

export const login = async (email, password) => {
  const response = await axios.post("http://localhost:5000/auth/login", {
    email,
    password,
  });
  return response.data;
};
