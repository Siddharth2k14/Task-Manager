import { useEffect } from "react";
import type { Task } from "../../types/Tasks";
import { CalendarView } from "../CalendarView";
import { CompleteTasks } from "../Completed Tasks/CompleteTasks";
import { TaskForm } from "../TaskForm";
import { TaskList } from "../TaskList";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { addTask, deleteTask, toggleTask, setTasks, clearTasks } from "../../redux/taskSlice";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "../../Styles/Task.style.css";
import "../../Styles/Logout.style.css";

export const TaskPage = () => {

    const tasks = useSelector((state: RootState) => state.tasks);
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const backend_url = import.meta.env.VITE_BACKEND_URL;

    // Fetch user's tasks from backend on component mount
    useEffect(() => {
        if (user && user._id) {
            console.log("Fetching tasks for user:", user._id);
            fetchUserTasks(user._id);
        } else {
            console.log("No user found, skipping task fetch");
        }
    }, [user, dispatch]);

    const fetchUserTasks = async (userId: string) => {
        try {
            const response = await fetch(`${backend_url}/api/tasks/user/${userId}`);
            if (response.ok) {
                const fetchedTasks = await response.json();
                console.log("Tasks fetched successfully:", fetchedTasks.length, "tasks");
                dispatch(setTasks(fetchedTasks));
            } else {
                console.error("Failed to fetch tasks. Status:", response.status);
                dispatch(setTasks([])); // Set empty array if fetch fails
            }
        } catch (error) {
            console.error("Error fetching tasks - Is the backend server running on port 5000?", error);
            dispatch(setTasks([])); // Set empty array on error
        }
    };

    const handleAddTask = async (task: Task) => {
        if (!user || !user._id) {
            console.error("User not logged in");
            alert("Please log in to create tasks");
            return;
        }

        try {
            const taskData = {
                ...task,
                userId: user._id
            };
            console.log("Creating task with data:", taskData);

            const response = await fetch(`${backend_url}/api/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(taskData)
            });

            if (response.ok) {
                const newTask = await response.json();
                console.log("Task created successfully:", newTask);
                dispatch(addTask(newTask));
                alert("Task created successfully!");
            } else {
                const error = await response.json();
                console.error("Failed to create task. Status:", response.status, error);
                alert("Failed to create task: " + (error.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Error creating task:", error);
            alert("Error creating task: " + (error instanceof Error ? error.message : "Unknown error"));
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        try {
            console.log("Deleting task:", taskId);
            const response = await fetch(`${backend_url}/api/tasks/${taskId}`, {
                method: "DELETE"
            });

            if (response.ok) {
                console.log("Task deleted successfully");
                dispatch(deleteTask(taskId));
                alert("Task deleted successfully!");
            } else {
                const error = await response.json();
                console.error("Failed to delete task. Status:", response.status, error);
                alert("Failed to delete task");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("Error deleting task: " + (error instanceof Error ? error.message : "Unknown error"));
        }
    };

    const handleCompleteTask = async (taskId: string) => {
        try {
            const currentTask = tasks.find(t => t._id === taskId);
            if (!currentTask) {
                console.error("Task not found:", taskId);
                return;
            }

            const newStatus = currentTask.status === "completed" ? "pending" : "completed";
            console.log("Updating task status to:", newStatus);
            
            const response = await fetch(`${backend_url}/api/tasks/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                console.log("Task updated successfully");
                dispatch(toggleTask(taskId));
            } else {
                const error = await response.json();
                console.error("Failed to update task. Status:", response.status, error);
                alert("Failed to update task");
            }
        } catch (error) {
            console.error("Error updating task:", error);
            alert("Error updating task: " + (error instanceof Error ? error.message : "Unknown error"));
        }
    };

    const handleLogout = () => {
        // Dispatch logout action to clear user and tasks
        dispatch(logout());
        dispatch(clearTasks());
        
        // Remove token
        localStorage.removeItem("token");

        // Redirect to login page
        navigate("/login");
    };

    const completedTasks = tasks.filter(task => task.status === "completed");

    return (
        <div className="app">

            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <h1>Task Manager {tasks.length}</h1>

                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </div>

            <TaskForm addTask={handleAddTask} />

            <TaskList
                tasks={tasks}
                deleteTask={handleDeleteTask}
                completeTask={handleCompleteTask}
            />

            <CalendarView tasks={tasks} />

            <CompleteTasks tasks={completedTasks} />

        </div>
    );
};