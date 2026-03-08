import { useState } from 'react';
import './App.css'
import type { Task } from './types/Tasks';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { CalendarView } from './components/CalendarView';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };
  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };
  

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} />
      <CalendarView tasks={tasks} />
    </div>
  )
}

export default App
