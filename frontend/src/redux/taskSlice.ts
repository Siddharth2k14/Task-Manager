import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";
import type { Task } from "../types/Tasks";

const savedTasks = localStorage.getItem("tasks");

const initialState: Task[] = savedTasks ? JSON.parse(savedTasks) : [];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {

    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state));
    },

    deleteTask: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
      localStorage.setItem("tasks", JSON.stringify(state));
    },

    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state[action.payload];
      task.status = task.status === "completed" ? "pending" : "completed";
      localStorage.setItem("tasks", JSON.stringify(state));
    }

  }
});

export const { addTask, deleteTask, toggleTask } = taskSlice.actions;

export default taskSlice.reducer;