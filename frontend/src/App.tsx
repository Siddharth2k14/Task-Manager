import { Route, Routes } from 'react-router-dom';
import Login from './components/Login Page/Login';
import Register from './components/Register Page/Register';
import { TaskPage } from './components/Task Page/TaskPage';
import Home from './components/Home Page/Home';

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
      {/* <TaskPage /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<TaskPage />} />
      </Routes>
    </>
  )
}

export default App
