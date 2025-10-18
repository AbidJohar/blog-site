/* eslint-disable no-useless-catch */
import apiClient from "./axios";
import { login } from "../features/auth/authSlicer";

//__________________( Register API )_______________
export const registerUser = (formData) => async (dispatch) => {
  try {
    const response = await apiClient.post("/auth/register", formData);

    // If registration successful, login user automatically
    if (response.data?.success) {
      dispatch(
        login({
          user: response.data.user,
          accessToken: response.data.token,
        })
      );
    }

    return response.data;
  } catch (error) {
    console.log("Error in registerApi calling:",error);
    // send actual backend error message
    throw error.response?.data?.error || error.message;
  }
};

//______________( Login API )____________________
export const loginUser = (formData) => async (dispatch) => {
  try {
    const response = await apiClient.post("/auth/login", formData);

    if (response.data?.success) {
      dispatch(
        login({
          user: response.data.user,
          accessToken: response.data.token,
        })
      );
    }

    return response.data;
  } catch (error) {
   console.log("Error in loginApi calling:",error);
    throw error.response?.data?.error || error.message;
  }
};
