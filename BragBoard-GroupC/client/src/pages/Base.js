import React from "react";
import { useNavigate } from "react-router-dom";
import "./Base.css";

const HomeLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-content">

        <h1 className="landing-title">BragBoard</h1>

        <p className="landing-subtitle">
          Celebrate achievements.<br />
          Recognize people.<br />
          Build a positive community.
        </p>

        <button 
          className="landing-btn"
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomeLanding;