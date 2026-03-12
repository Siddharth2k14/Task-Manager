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

    login: (state, action: PayloadAction<{email: string, password: string}>) => {
      const savedUser = localStorage.getItem("user");

      if (savedUser) {
        const user = JSON.parse(savedUser);

        if (
          user.email === action.payload.email &&
          user.password === action.payload.password
        ) {
          state.user = user;
        }
      }
    },

    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    }

  }
});

export const { register, login, logout } = authSlice.actions;

export default authSlice.reducer;