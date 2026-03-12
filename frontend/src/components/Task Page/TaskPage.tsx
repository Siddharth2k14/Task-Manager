import type { Task } from "../../types/Tasks";
import { CalendarView } from "../CalendarView";
import { CompleteTasks } from "../Completed Tasks/CompleteTasks";
import { TaskForm } from "../TaskForm";
import { TaskList } from "../TaskList";
import "../../Styles/Task.style.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { addTask, deleteTask, toggleTask } from "../../redux/taskSlice";

export const TaskPage = () => {

    const tasks = useSelector((state: RootState) => state.tasks);
    const dispatch = useDispatch();

    const handleAddTask = (task: Task) => {
        dispatch(addTask(task));
    };

    const handleDeleteTask = (index: number) => {
        dispatch(deleteTask(index));
    };

    const handleCompleteTask = (index: number) => {
        dispatch(toggleTask(index));
    };

    const completedTasks = tasks.filter(task => task.status === "completed");

    return (
        <div className="app">

            <h1>Task Manager {tasks.length}</h1>

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