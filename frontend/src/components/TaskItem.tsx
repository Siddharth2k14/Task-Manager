import type { Task } from "../types/Tasks"

interface TaskItemProps {
    tasks: Task;
    deleteTask: () => void;
}

export const TaskItem = ({ tasks, deleteTask }: TaskItemProps) => {
    return (
        <div className="task-item">
            <h3>{tasks.title}</h3>
            <p>{tasks.description}</p>
            <p><strong>Deadline:</strong> {tasks.deadline} </p>
            <button onClick={deleteTask}>Delete</button>
        </div>
    )
}