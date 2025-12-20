// src/features/authentication/pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./LoginPage.css";
import logo from "../../../assets/logo.png";

function Signup() {
  const { signup, loading, error } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "EMPLOYEE",
  });

  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setLocalError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setLocalError("All fields are required");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    const result = await signup(
      formData.name,
      formData.email,
      formData.password,
      formData.role
    );

    if (result?.success) {
      navigate("/login");
    } else if (result?.message) {
      setLocalError(result.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <img src={logo} alt="BragBoard" className="auth-logo-img" />
          <h1 className="auth-title auth-title--center">Create your account</h1>
          <p className="auth-subtitle auth-subtitle--center">
            Sign up as Employee or Admin to start using BragBoard.
          </p>
        </div>

        {/* Role switch like login */}
        <div className="role-switch">
          <button
            type="button"
            className={
              formData.role === "EMPLOYEE"
                ? "role-toggle role-toggle--active"
                : "role-toggle"
            }
            onClick={() =>
              setFormData((prev) => ({ ...prev, role: "EMPLOYEE" }))
            }
          >
            Employee
          </button>
          <button
            type="button"
            className={
              formData.role === "ADMIN"
                ? "role-toggle role-toggle--active"
                : "role-toggle"
            }
            onClick={() =>
              setFormData((prev) => ({ ...prev, role: "ADMIN" }))
            }
          >
            Admin
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label">
            Full name
            <input
              className="auth-input"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label className="auth-label">
            Work email
            <input
              className="auth-input"
              type="email"
              name="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label className="auth-label">
            Password
            <input
              className="auth-input"
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          <label className="auth-label">
            Confirm password
            <input
              className="auth-input"
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </label>

          {(localError || error) && (
            <div className="auth-error">{localError || error}</div>
          )}

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
