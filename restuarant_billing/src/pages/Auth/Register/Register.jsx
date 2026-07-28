import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaBuilding,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaLock,
} from "react-icons/fa";

import { registerUser } from "../../../../src/api/authApi";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    restaurantName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
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

    if (
      !formData.restaurantName ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.role ||
      !formData.password
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await registerUser(formData);

      alert(response.data.message || "Registration Successful");

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Unable to create account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="overlay"></div>

      <div className="register-card">

        {/* HEADER */}

        <div className="logo">
          <h2>Create Account</h2>
          <p>Restaurant Billing Software</p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Restaurant */}

          <div className="input-group full">
            <div className="icon-box">
              <FaBuilding />
            </div>

            <input
              type="text"
              name="restaurantName"
              placeholder="Restaurant Name"
              value={formData.restaurantName}
              onChange={handleChange}
            />
          </div>

          {/* First Name + Last Name */}

          <div className="row">

            <div className="input-group">
              <div className="icon-box">
                <FaUser />
              </div>

              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <div className="icon-box">
                <FaUser />
              </div>

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* Email + Phone */}

          <div className="row">

            <div className="input-group">
              <div className="icon-box">
                <FaEnvelope />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <div className="icon-box">
                <FaPhone />
              </div>

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* Role */}

          <div className="input-group full">
            <div className="icon-box">
              <FaBriefcase />
            </div>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Cashier">Cashier</option>
              <option value="Chef">Chef</option>
              <option value="Waiter">Waiter</option>
            </select>
          </div>

          {/* Password */}

          <div className="input-group full">

            <div className="icon-box">
              <FaLock />
            </div>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <button
              type="button"
              className="eye-btn"
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

          {/* Button */}

          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        {/* Footer */}

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;