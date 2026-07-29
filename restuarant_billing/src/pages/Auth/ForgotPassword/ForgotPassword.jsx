import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { forgotPasswordSchema } from "../../../../src/validation/authValidation";
import { forgotPasswordAPI } from "../../../../src/redux/auth/authService";

import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setServerMessage("");
      setServerError("");

      const response = await forgotPasswordAPI(data.email);

      console.log("API Response :", response);

      setServerMessage(response.message);

      reset();
    } catch (error) {
      console.error(error);

      setServerError(
        error.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      <div className="overlay"></div>

      <div className="forgot-card">

        {/* Header */}

        <div className="forgot-header">
          <h1>Forgot Password</h1>

          <p>
            Enter your registered email address.
            <br />
            We'll send an OTP to your email.
          </p>
        </div>

        {/* Success Message */}

        {serverMessage && (
          <div className="success-message">
            {serverMessage}
          </div>
        )}

        {/* Error Message */}

        {serverError && (
          <div className="server-error">
            {serverError}
          </div>
        )}

        {/* Form */}

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="form-group">

            <label>Email Address</label>

            <div className="input-box">

              <span className="input-icon">
                <FaEnvelope />
              </span>

              <input
                type="email"
                placeholder="Enter your email address"
                autoComplete="email"
                {...register("email")}
              />

            </div>

            {errors.email && (
              <p className="error-text">
                {errors.email.message}
              </p>
            )}

          </div>

          <button
            type="submit"
            className="forgot-btn"
            disabled={loading}
          >
            {loading ? "Sending Link..." : "Send Link"}
          </button>

        </form>

        <div className="back-login">

          <p>
            Remember your password?

            <Link to="/login">
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;