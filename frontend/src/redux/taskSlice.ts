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

    deleteTask: (state, action: PayloadAction<string>) => {
      return state.filter(task => task._id !== action.payload);
    },

    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.find(t => t._id === action.payload);
      if (task) {
        task.status = task.status === "completed" ? "pending" : "completed";
        localStorage.setItem("tasks", JSON.stringify(state));
      }
    },

    setTasks: (state, action: PayloadAction<Task[]>) => {
      return action.payload;
    },

    clearTasks: () => {
      localStorage.removeItem("tasks");
      return [];
    }

  }
});

export const { addTask, deleteTask, toggleTask, setTasks, clearTasks } = taskSlice.actions;

export default taskSlice.reducer;