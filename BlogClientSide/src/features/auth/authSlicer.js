// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const accessToken = localStorage.getItem("accessToken");
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  userData: user || null,
  accessToken: accessToken || null,
  isAuthenticated: !!accessToken
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.userData = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
