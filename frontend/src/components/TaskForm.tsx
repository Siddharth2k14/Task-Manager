import React, { useState } from "react";
import type { Task } from "../types/Tasks"

interface TaskFormProps {
    addTask: (task: Task) => void;
}

export const TaskForm = ({ addTask }: TaskFormProps) => {
    const [task, setTask] = useState<Task>({
        title: "",
        description: "",
        deadline: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addTask(task);
        setTask({
            title: "",
            description: "",
            deadline: "",
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={task.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTask({ ...task, title: e.target.value })
                }
                required
            />

            <textarea
                placeholder="Description"
                value={task.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setTask({ ...task, description: e.target.value })
                }
            />

            <input
                type="date"
                value={task.deadline}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTask({ ...task, deadline: e.target.value })
                }
                required
            />

            <button type="submit">Add Task</button>
        </form>
    )
}