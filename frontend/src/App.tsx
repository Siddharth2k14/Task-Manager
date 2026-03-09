import { Login } from './components/Login Page/Login';
import { Register } from './components/Register Page/Register';
import { TaskPage } from './components/Task Page/TaskPage';

function App() {
  
  

  return (
    // <div className="app">
    //   <h1>Task Manager</h1>
    //   <TaskForm addTask={addTask} />
    //   <TaskList tasks={tasks} deleteTask={deleteTask} />
    //   <CalendarView tasks={tasks} />
    // </div>
    <>
      {/* <Login /> */}
      {/* <Register /> */}
      <TaskPage />
    </>
  )
}

export default App
