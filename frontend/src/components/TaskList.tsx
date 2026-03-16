import type { Task } from "../types/Tasks";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
    tasks: Task[];
    deleteTask: (taskId: string) => void;
    completeTask: (taskId: string) => void;
}

export const TaskList = ({ tasks, deleteTask, completeTask }: TaskListProps) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
            key={task._id}
            tasks={task}
            deleteTask={() => deleteTask(task._id || "")}
            completeTask={() => completeTask(task._id || "")}
        />
      ))}
    </div>
  )
}