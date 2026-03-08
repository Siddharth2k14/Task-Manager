import type { Task } from "../types/Tasks";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
    tasks: Task[];
    deleteTask: (index: number) => void;
}

export const TaskList = ({ tasks, deleteTask }: TaskListProps) => {
  return (
    <div>
      {tasks.map((task, index) => (
        <TaskItem
            key={index}
            tasks={task}
            deleteTask={() => deleteTask(index)}
        />
      ))}
    </div>
  )
}