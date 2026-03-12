import type { Task } from "../types/Tasks"

interface TaskItemProps {
    tasks: Task;
    deleteTask: () => void;
    completeTask: () => void;
}

export const TaskItem = ({ tasks, deleteTask, completeTask }: TaskItemProps) => {
    return (
        <div className="task-item">
            <h3>{tasks.title}</h3>
            <p>{tasks.description}</p>
            <p><strong>Deadline:</strong> {tasks.deadline} </p>
            <button onClick={deleteTask}>Delete</button>
            <button onClick={completeTask}>
                {tasks.status === "completed"
                    ? "Mark as Pending"
                    : "Mark as Completed"}
            </button>
        </div>
    )
}