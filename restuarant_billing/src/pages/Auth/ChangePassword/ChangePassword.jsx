import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

import {
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { changePasswordSchema } from "../../../../src/validation/authValidation";

import { changePasswordAPI } from "../../../../src/redux/auth/authService";

import "./ChangePassword.css";

const ChangePassword = () => {

  const navigate = useNavigate();

  /* ==========================================
      Password Visibility
  ========================================== */

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  /* ==========================================
      Loading & Messages
  ========================================== */

  const [loading, setLoading] = useState(false);

  const [serverMessage, setServerMessage] =
    useState("");

  const [serverError, setServerError] =
    useState("");

  /* ==========================================
      React Hook Form
  ========================================== */

  const {

    register,

    handleSubmit,

    reset,

    formState: { errors },

  } = useForm({

    resolver: yupResolver(changePasswordSchema),

  });

  /* ==========================================
      Submit Function
  ========================================== */

  const onSubmit = async (data) => {

    try {

      setLoading(true);

      setServerMessage("");

      setServerError("");

      const payload = {

        currentPassword: data.currentPassword,

        newPassword: data.newPassword,

      };

      const response = await changePasswordAPI(payload);

      console.log(response);

      setServerMessage(response.message);

      reset();

      setTimeout(() => {

        navigate("/login");

      }, 2000);

    }

    catch (error) {

      console.error(error);

      setServerError(

        error.response?.data?.message ||

        "Something went wrong."

      );

    }

    finally {

      setLoading(false);

    }

  };
    return (
    <div className="change-password-page">

      {/* Background Overlay */}

      <div className="overlay"></div>

      {/* Change Password Card */}

      <div className="change-password-card">

        {/* Header */}

        <div className="change-password-header">

          <h1>Change Password</h1>

          <p>
            Update your account password.
            <br />
            Choose a strong password to keep your account secure.
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

          {/* Current Password */}

          <div className="form-group">

            <label>Current Password</label>

            <div className="input-box">

              <span className="input-icon">

                <FaLock />

              </span>

              <input

                type={

                  showCurrentPassword

                    ? "text"

                    : "password"

                }

                placeholder="Enter Current Password"

                autoComplete="current-password"

                {...register("currentPassword")}

              />

              <button

                type="button"

                className="password-toggle"

                onClick={() =>

                  setShowCurrentPassword(

                    !showCurrentPassword

                  )

                }

              >

                {

                  showCurrentPassword

                    ?

                    <FaEyeSlash />

                    :

                    <FaEye />

                }

              </button>

            </div>

            {

              errors.currentPassword &&

              <p className="error-text">

                {errors.currentPassword.message}

              </p>

            }

          </div>

          {/* New Password */}

          <div className="form-group">

            <label>New Password</label>

            <div className="input-box">

              <span className="input-icon">

                <FaLock />

              </span>

              <input

                type={

                  showNewPassword

                    ? "text"

                    : "password"

                }

                placeholder="Enter New Password"

                autoComplete="new-password"

                {...register("newPassword")}

              />

              <button

                type="button"

                className="password-toggle"

                onClick={() =>

                  setShowNewPassword(

                    !showNewPassword

                  )

                }

              >

                {

                  showNewPassword

                    ?

                    <FaEyeSlash />

                    :

                    <FaEye />

                }

              </button>

            </div>

            {

              errors.newPassword &&

              <p className="error-text">

                {errors.newPassword.message}

              </p>

            }

          </div>

          {/* Confirm Password */}

          <div className="form-group">

            <label>Confirm Password</label>

            <div className="input-box">

              <span className="input-icon">

                <FaLock />

              </span>

              <input

                type={

                  showConfirmPassword

                    ? "text"

                    : "password"

                }

                placeholder="Confirm New Password"

                autoComplete="new-password"

                {...register("confirmPassword")}

              />

              <button

                type="button"

                className="password-toggle"

                onClick={() =>

                  setShowConfirmPassword(

                    !showConfirmPassword

                  )

                }

              >

                {

                  showConfirmPassword

                    ?

                    <FaEyeSlash />

                    :

                    <FaEye />

                }

              </button>

            </div>

            {

              errors.confirmPassword &&

              <p className="error-text">

                {errors.confirmPassword.message}

              </p>

            }

          </div>

          {/* Submit Button */}

          <button

            type="submit"

            className="change-password-btn"

            disabled={loading}

          >

            {

              loading

                ?

                "Updating Password..."

                :

                "Change Password"

            }

          </button>

        </form>

        {/* Footer */}

        <div className="back-login">

          <p>

            Back to

            <Link to="/login">

              Login

            </Link>

          </p>

        </div>

      </div>

    </div>

  );
}

export default ChangePassword;