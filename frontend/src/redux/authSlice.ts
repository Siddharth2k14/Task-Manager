import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/User";

interface AuthState {
  user: User | null;
}

const savedUser = localStorage.getItem("user");

const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    register: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("tasks");
    }

  }
});

export const { register, login, logout } = authSlice.actions;

export default authSlice.reducer;