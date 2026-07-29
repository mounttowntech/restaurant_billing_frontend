import axiosInstance from "../../../src/services/axiosInstance";
/* ===========================================
   Forgot Password
=========================================== */

export const forgotPasswordAPI = async (email) => {

    const response = await axiosInstance.post(

        "/auth/forgot-password",

        {
            email
        }

    );

    return response.data;

};

/* ===========================================
   Reset Password
=========================================== */

export const resetPasswordAPI = async (

    token,

    password

) => {

    const response = await axiosInstance.post(

        `/auth/reset-password/${token}`,

        {

            password

        }

    );

    return response.data;

};
// Change Password
export const changePasswordAPI = async (payload) => {

    const token = localStorage.getItem("billing_token");

    const response = await axiosInstance.put(

        "/auth/change-password",

        payload,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

};