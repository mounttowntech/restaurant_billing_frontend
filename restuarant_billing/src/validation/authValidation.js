import * as yup from "yup";


//    Forgot Password Validation


export const forgotPasswordSchema = yup.object({

    email: yup
        .string()
        .required("Email is required.")
        .email("Please enter a valid email address.")

});


//    Reset Password Validation


export const resetPasswordSchema = yup.object({

    password: yup
        .string()
        .required("Password is required.")
        .min(6, "Password must be at least 6 characters."),

    confirmPassword: yup
        .string()
        .required("Confirm Password is required.")
        .oneOf(
            [yup.ref("password")],
            "Passwords do not match."
        )

});

// Change Password 
export const changePasswordSchema = yup.object({

    currentPassword: yup
        .string()
        .required("Current Password is required."),

    newPassword: yup
        .string()
        .required("New Password is required.")
        .min(6, "Password must be at least 6 characters."),

    confirmPassword: yup
        .string()
        .required("Confirm Password is required.")
        .oneOf(
            [yup.ref("newPassword")],
            "Passwords do not match."
        )

});