import type { Task } from "../../types/Tasks";

interface CompleteTasksProps {
  tasks: Task[];
}

export const CompleteTasks = ({ tasks }: CompleteTasksProps) => {
  return (
    <div>
      <h1>Completed Tasks</h1>

      {tasks.length === 0 ? (
        <p>You have no completed tasks.</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><strong>Deadline:</strong> {task.deadline}</p>
          </div>
        ))
      )}
    </div>
  );
};