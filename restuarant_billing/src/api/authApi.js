import API from "./api";

export const registerUser = async (userData) => {

    return await API.post("/auth/register", userData);

};

export const loginUser = async (userData) => {

    return await API.post("/auth/login", userData);

};