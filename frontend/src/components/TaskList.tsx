import type { Task } from "../types/Tasks";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
    tasks: Task[];
    deleteTask: (index: number) => void;
    completeTask: (index: number) => void;
}

export const TaskList = ({ tasks, deleteTask, completeTask }: TaskListProps) => {
  return (
    <div>
      {tasks.map((task, index) => (
        <TaskItem
            key={index}
            tasks={task}
            deleteTask={() => deleteTask(index)}
            completeTask={() => completeTask(index)}
        />
      ))}
    </div>
  )
}