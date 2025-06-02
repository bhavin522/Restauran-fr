// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // Handle login
        const success = await login(formData.email, formData.password);
        if (success) {
          alert("Login successful!");
          navigate("/"); // Redirect to home page
        }
      } else {
        // Handle registration
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match!");
          setLoading(false);
          return;
        }

        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters long");
          setLoading(false);
          return;
        }

        const success = await signup(
          formData.name,
          formData.email,
          formData.password
        );
        if (success) {
          alert("Registration successful! Please login.");
          setIsLogin(true);
          setFormData({
            email: formData.email, // Keep email for login
            password: "",
            name: "",
            confirmPassword: "",
          });
        }
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>{isLogin ? "Login" : "Register"}</h2>
          <div className="toggle-buttons">
            <button
              className={isLogin ? "active" : ""}
              onClick={() => {
                setIsLogin(true);
                setError("");
                setFormData({
                  email: "",
                  password: "",
                  name: "",
                  confirmPassword: "",
                });
              }}
            >
              Login
            </button>
            <button
              className={!isLogin ? "active" : ""}
              onClick={() => {
                setIsLogin(false);
                setError("");
                setFormData({
                  email: "",
                  password: "",
                  name: "",
                  confirmPassword: "",
                });
              }}
            >
              Register
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required={!isLogin}
                placeholder="Enter your name"
                disabled={loading}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required={!isLogin}
                placeholder="Confirm your password"
                disabled={loading}
              />
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        {isLogin && (
          <div className="forgot-password">
            <a href="#reset">Forgot Password?</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
