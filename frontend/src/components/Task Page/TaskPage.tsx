import { useState } from "react";
import { CalendarView } from "../CalendarView"
import { TaskForm } from "../TaskForm"
import { TaskList } from "../TaskList"
import type { Task } from "../../types/Tasks";
import "../../Styles/Task.style.css";

export const TaskPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const addTask = (task: Task) => {
        setTasks([...tasks, task]);
    };
    const deleteTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };
    return (
        <div className="app">
            <h1>Task Manager</h1>
            <TaskForm addTask={addTask} />
            <TaskList tasks={tasks} deleteTask={deleteTask} />
            <CalendarView tasks={tasks} />
        </div>
    )
}