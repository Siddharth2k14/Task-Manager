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

    // Fetch user's tasks from backend on component mount
    useEffect(() => {
        if (user && user._id) {
            fetchUserTasks(user._id);
        }
    }, [user]);

    const fetchUserTasks = async (userId: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tasks/user/${userId}`);
            if (response.ok) {
                const fetchedTasks = await response.json();
                dispatch(setTasks(fetchedTasks));
            } else {
                console.error("Failed to fetch tasks. Status:", response.status);
            }
        } catch (error) {
            console.error("Error fetching tasks - Is the backend server running on port 5000?", error);
        }
    };

    const handleAddTask = async (task: Task) => {
        if (!user || !user._id) {
            console.error("User not logged in");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...task,
                    userId: user._id
                })
            });

            if (response.ok) {
                const newTask = await response.json();
                dispatch(addTask(newTask));
            }
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: "DELETE"
            });

            if (response.ok) {
                dispatch(deleteTask(taskId));
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleCompleteTask = async (taskId: string) => {
        try {
            const currentTask = tasks.find(t => t._id === taskId);
            if (!currentTask) return;

            const newStatus = currentTask.status === "completed" ? "pending" : "completed";
            
            const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                dispatch(toggleTask(taskId));
            }
        } catch (error) {
            console.error("Error updating task:", error);
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