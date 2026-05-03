import { Route, Routes } from 'react-router-dom';
import Login from './components/Login Page/Login';
import Register from './components/Register Page/Register';
import { TaskPage } from './components/Task Page/TaskPage';
import Home from './components/Home Page/Home';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<TaskPage />} />
      </Routes>
  )
}

export default App
