import React, { useState } from "react";
import { login } from "../features/authentication/services/login";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      alert("Login Successful!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page-container">

      <div className="login-left">
        <h1>BragBoard</h1>
        <p>
          Share shout-outs,<br />
           recognize contributions,<br /> and climb the leaderboard — Together!
        </p>
      </div>

      
      <div className="login-right">

        <div className="big-text">
          Brag Board <br />
          Brag Board <br />
          Brag Board <br />
          Brag Board <br />
          Brag Board <br />
          Brag Board <br />
          Brag Board <br />
          Brag Board <br />
          Brag Board <br />
          Brag Board <br />
        </div>

        <div className="login-card">
          <h2>Welcome back!</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Login</button>
          </form>

          <p
            className="forgot-text"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;