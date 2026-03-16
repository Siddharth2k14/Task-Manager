import type { Task } from "../../types/Tasks";
import { CalendarView } from "../CalendarView";
import { CompleteTasks } from "../Completed Tasks/CompleteTasks";
import { TaskForm } from "../TaskForm";
import { TaskList } from "../TaskList";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { addTask, deleteTask, toggleTask } from "../../redux/taskSlice";
import { useNavigate } from "react-router-dom";
import "../../Styles/Task.style.css";
import "../../Styles/Logout.style.css";

export const TaskPage = () => {

    const tasks = useSelector((state: RootState) => state.tasks);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddTask = (task: Task) => {
        dispatch(addTask(task));
    };

    const handleDeleteTask = (index: number) => {
        dispatch(deleteTask(index));
    };

    const handleCompleteTask = (index: number) => {
        dispatch(toggleTask(index));
    };

    const handleLogout = () => {
        // remove token
        localStorage.removeItem("token");

        // redirect to login page
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