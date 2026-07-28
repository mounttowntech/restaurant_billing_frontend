import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { loginUser } from "../../../../src/api/authApi";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter Email and Password");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser(formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      if (response.data.user?.store) {
        localStorage.setItem(
          "store",
          response.data.user.store
        );
      }

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Invalid Email or Password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="overlay"></div>

      <div className="login-card">

        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Login to Restaurant Billing Software</p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Email */}

          <div className="form-group">

            <label>Email Address</label>

            <div className="input-box">

              <div className="input-icon">
                <FaEnvelope />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Enter Email Address"
                value={formData.email}
                onChange={handleChange}
              />

            </div>

          </div>

          {/* Password */}

          <div className="form-group">

            <label>Password</label>

            <div className="input-box">

              <div className="input-icon">
                <FaLock />
              </div>

              <input
                type={
                  showPassword ? "text" : "password"
                }
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          {/* Forgot Password */}

          <div className="forgot-wrapper">

            <Link
              to="/forgot-password"
              className="forgot-password"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Login Button */}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>

        </form>

        <div className="register-wrapper">

          <p>
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;