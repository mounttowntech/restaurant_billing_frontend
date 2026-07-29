import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { resetPasswordSchema } from "../../../../src/validation/authValidation";

import { resetPasswordAPI } from "../../../../src/redux/auth/authService";

import "./ResetPassword.css";

const ResetPassword = () => {

    const navigate = useNavigate();

    const { token } = useParams();

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [serverMessage, setServerMessage] = useState("");

    const [serverError, setServerError] = useState("");

    const {

        register,

        handleSubmit,

        reset,

        formState: { errors }

    } = useForm({

        resolver: yupResolver(resetPasswordSchema)

    });

    const onSubmit = async (data) => {

        try {

            setLoading(true);

            setServerMessage("");

            setServerError("");

            const response = await resetPasswordAPI(

                token,

                data.password

            );

            setServerMessage(response.message);

            reset();

            setTimeout(() => {

                navigate("/login");

            }, 2000);

        }

        catch (error) {

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

        <div className="reset-page">

            <div className="overlay"></div>

            <div className="reset-card">

                <div className="reset-header">

                    <h1>Reset Password</h1>

                    <p>

                        Create a strong password for your account.

                        <br />

                        Your new password must be different from the previous one.

                    </p>

                </div>

                {serverMessage && (

                    <div className="success-message">

                        {serverMessage}

                    </div>

                )}

                {serverError && (

                    <div className="server-error">

                        {serverError}

                    </div>

                )}

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-group">

                        <label>New Password</label>

                        <div className="input-box">

                            <span className="input-icon">

                                <FaLock />

                            </span>

                            <input

                                type={showPassword ? "text" : "password"}

                                placeholder="Enter New Password"

                                {...register("password")}

                            />

                            <button

                                type="button"

                                className="password-toggle"

                                onClick={() => setShowPassword(!showPassword)}

                            >

                                {

                                    showPassword

                                        ?

                                        <FaEyeSlash />

                                        :

                                        <FaEye />

                                }

                            </button>

                        </div>

                        {

                            errors.password &&

                            <p className="error-text">

                                {errors.password.message}

                            </p>

                        }

                    </div>

                    <div className="form-group">

                        <label>Confirm Password</label>

                        <div className="input-box">

                            <span className="input-icon">

                                <FaLock />

                            </span>

                            <input

                                type={

                                    showConfirmPassword

                                        ?

                                        "text"

                                        :

                                        "password"

                                }

                                placeholder="Confirm Password"

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

                                {

                                    errors.confirmPassword.message

                                }

                            </p>

                        }

                    </div>

                    <button

                        type="submit"

                        className="reset-btn"

                        disabled={loading}

                    >

                        {

                            loading

                                ?

                                "Updating Password..."

                                :

                                "Reset Password"

                        }

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

export default ResetPassword;