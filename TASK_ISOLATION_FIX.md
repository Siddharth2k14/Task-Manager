# Task Data Isolation Fix - Complete Documentation

**Date**: March 17, 2026  
**Issue**: Tasks created by one user (User A) were visible to other users (User B) after logging in  
**Status**: ✅ RESOLVED

---

## Problem Description

### Symptoms
- User A logs in and creates several tasks
- User A logs out
- User B logs in
- User B can see all tasks created by User A

### Root Cause
Tasks were stored globally in browser's `localStorage` without any user association or filtering. When a user logged out, their tasks remained in `localStorage`. When another user logged in, the application loaded all tasks from `localStorage` regardless of which user created them.

---

## Solution Overview

The fix implements proper user-specific task management by:
1. **Storing tasks on the backend** with `userId` association
2. **Fetching user-specific tasks** when a user logs in
3. **Clearing tasks from localStorage** when a user logs out
4. **Using task IDs** instead of array indices for all operations
5. **Making API calls** for create, update, delete operations

---

## Detailed Changes

### Part 1: Frontend Changes

#### 1. File: `frontend/src/redux/taskSlice.ts`

**Changes Made**:
- Updated `deleteTask` reducer to use task ID (string) instead of array index
- Updated `toggleTask` reducer to use task ID (string) instead of array index
- Added new `setTasks` action to load tasks from backend
- Added new `clearTasks` action to clear tasks on logout

**Before**:
```typescript
deleteTask: (state, action: PayloadAction<number>) => {
  state.splice(action.payload, 1);
  localStorage.setItem("tasks", JSON.stringify(state));
},

toggleTask: (state, action: PayloadAction<number>) => {
  const task = state[action.payload];
  task.status = task.status === "completed" ? "pending" : "completed";
  localStorage.setItem("tasks", JSON.stringify(state));
}
```

**After**:
```typescript
deleteTask: (state, action: PayloadAction<string>) => {
  return state.filter(task => task._id !== action.payload);
},

toggleTask: (state, action: PayloadAction<string>) => {
  const task = state.find(t => t._id === action.payload);
  if (task) {
    task.status = task.status === "completed" ? "pending" : "completed";
    localStorage.setItem("tasks", JSON.stringify(state));
  }
},

setTasks: (state, action: PayloadAction<Task[]>) => {
  return action.payload;
},

clearTasks: () => {
  localStorage.removeItem("tasks");
  return [];
}
```

**Export Statement Updated**:
```typescript
export const { addTask, deleteTask, toggleTask, setTasks, clearTasks } = taskSlice.actions;
```

---

#### 2. File: `frontend/src/redux/authSlice.ts`

**Changes Made**:
- Updated `logout` action to also clear tasks from localStorage

**Before**:
```typescript
logout: (state) => {
  state.user = null;
  localStorage.removeItem("user");
}
```

**After**:
```typescript
logout: (state) => {
  state.user = null;
  localStorage.removeItem("user");
  localStorage.removeItem("tasks");
}
```

---

#### 3. File: `frontend/src/components/Task Page/TaskPage.tsx`

**Changes Made**:
- Added `useEffect` import
- Added `useEffect` to fetch user-specific tasks on component mount
- Imported `logout` action from authSlice
- Added `setTasks` and `clearTasks` to imports
- Updated `handleAddTask` to make API call with userId
- Updated `handleDeleteTask` to make API call
- Updated `handleCompleteTask` to make API call
- Updated `handleLogout` to dispatch logout action

**Before**:
```typescript
import type { Task } from "../../types/Tasks";
import { CalendarView } from "../CalendarView";
import { CompleteTasks } from "../Completed Tasks/CompleteTasks";
import { TaskForm } from "../TaskForm";
import { TaskList } from "../TaskList";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { addTask, deleteTask, toggleTask } from "../../redux/taskSlice";
import { useNavigate } from "react-router-dom";
import "../../Styles/Task.style.css";
import "../../Styles/Logout.style.css";

export const TaskPage = () => {
    const tasks = useSelector((state: RootState) => state.tasks);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddTask = (task: Task) => {
        dispatch(addTask(task));
    };

    const handleDeleteTask = (index: number) => {
        dispatch(deleteTask(index));
    };

    const handleCompleteTask = (index: number) => {
        dispatch(toggleTask(index));
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
```

**After**:
```typescript
import { useEffect } from "react";
import type { Task } from "../../types/Tasks";
import { CalendarView } from "../CalendarView";
import { CompleteTasks } from "../Completed Tasks/CompleteTasks";
import { TaskForm } from "../TaskForm";
import { TaskList } from "../TaskList";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { addTask, deleteTask, toggleTask, setTasks, clearTasks } from "../../redux/taskSlice";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "../../Styles/Task.style.css";
import "../../Styles/Logout.style.css";

export const TaskPage = () => {
    const tasks = useSelector((state: RootState) => state.tasks);
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fetch user's tasks from backend on component mount
    useEffect(() => {
        if (user && user._id) {
            fetchUserTasks(user._id);
        }
    }, [user]);

    const fetchUserTasks = async (userId: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tasks/user/${userId}`);
            if (response.ok) {
                const fetchedTasks = await response.json();
                dispatch(setTasks(fetchedTasks));
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleAddTask = async (task: Task) => {
        if (!user || !user._id) {
            console.error("User not logged in");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...task,
                    userId: user._id
                })
            });

            if (response.ok) {
                const newTask = await response.json();
                dispatch(addTask(newTask));
            }
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: "DELETE"
            });

            if (response.ok) {
                dispatch(deleteTask(taskId));
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleCompleteTask = async (taskId: string) => {
        try {
            const currentTask = tasks.find(t => t._id === taskId);
            if (!currentTask) return;

            const newStatus = currentTask.status === "completed" ? "pending" : "completed";
            
            const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                dispatch(toggleTask(taskId));
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleLogout = () => {
        // Dispatch logout action to clear user and tasks
        dispatch(logout());
        dispatch(clearTasks());
        
        // Remove token
        localStorage.removeItem("token");

        // Redirect to login page
        navigate("/login");
    };
```

---

#### 4. File: `frontend/src/components/TaskList.tsx`

**Changes Made**:
- Updated `TaskListProps` interface to accept task ID (string) instead of index (number)
- Changed map function to use `task._id` as key instead of index
- Updated handler calls to pass task ID instead of index

**Before**:
```typescript
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
```

**After**:
```typescript
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
```

---

#### 5. File: `frontend/src/components/Completed Tasks/CompleteTasks.tsx`

**Changes Made**:
- Changed map function to use `task._id` as key instead of index

**Before**:
```typescript
tasks.map((task, index) => (
  <div key={index} className="task-item">
    <h3>{task.title}</h3>
    <p>{task.description}</p>
    <p><strong>Deadline:</strong> {task.deadline}</p>
  </div>
))
```

**After**:
```typescript
tasks.map((task) => (
  <div key={task._id} className="task-item">
    <h3>{task.title}</h3>
    <p>{task.description}</p>
    <p><strong>Deadline:</strong> {task.deadline}</p>
  </div>
))
```

---

#### 6. File: `frontend/src/types/User.ts`

**Changes Made**:
- Updated User type to use `_id` instead of `id` to match MongoDB convention

**Before**:
```typescript
export type User = {
    id?: number;
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
}
```

**After**:
```typescript
export type User = {
    _id?: string;
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
}
```

---

### Part 2: Backend Changes

#### 1. File: `backend/Controllers/User Controller/loginUser.controller.js`

**Changes Made**:
- Updated response to include full user object with `_id`, `name`, `email` fields
- Changed `userId` field to `_id` for consistency with frontend

**Before**:
```javascript
res.json({
  message: "Login successful",
  userId: user._id,
  token: token
});
```

**After**:
```javascript
res.json({
  message: "Login successful",
  _id: user._id,
  name: user.name,
  email: user.email,
  token: token
});
```

---

#### 2. File: `backend/Controllers/User Controller/registerUser.controller.js`

**Changes Made**:
- Updated response to include full user object with `_id`, `name`, `email` fields
- Changed `userId` field to `_id` for consistency with frontend

**Before**:
```javascript
res.status(201).json({
    message: "User registered successfully",
    userId: user._id,
    token
});
```

**After**:
```javascript
res.status(201).json({
    message: "User registered successfully",
    _id: user._id,
    name: user.name,
    email: user.email,
    token
});
```

---

## How the Solution Works

### Login Flow
1. User enters credentials and submits login form
2. Backend validates credentials and returns user object with `_id`, `name`, `email`, and JWT token
3. Frontend stores user in Redux auth state
4. `TaskPage` component's `useEffect` detects user change
5. `fetchUserTasks(userId)` is called via GET `/api/tasks/user/{userId}`
6. Backend returns only tasks belonging to that user
7. Frontend Redux loads these tasks via `setTasks` action
8. Only the current user's tasks are displayed

### Task Creation Flow
1. User fills task form and submits
2. `handleAddTask` makes POST request to `/api/tasks` with:
   - Task data (title, description, deadline)
   - `userId` from current user
3. Backend creates task with userId association
4. Returns created task with `_id`
5. Frontend adds task to Redux store
6. Task now only belongs to this user

### Task Update/Delete Flow
1. User clicks delete or complete button on a task
2. `handleDeleteTask` or `handleCompleteTask` is called with task ID
3. API request made to `/api/tasks/{taskId}` (PUT for update, DELETE for delete)
4. Backend performs operation
5. Frontend updates Redis state
6. UI reflects change

### Logout Flow
1. User clicks logout button
2. `handleLogout` dispatches:
   - `logout()` - clears user from auth state
   - `clearTasks()` - clears tasks from state and localStorage
3. Token removed from localStorage
4. User redirected to login page
5. When next user logs in, steps from Login Flow repeat (clean slate)

---

## API Endpoints Used

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `/api/tasks/user/:userId` | Fetch user's tasks | User ID required |
| POST | `/api/tasks` | Create new task | User ID in body |
| PUT | `/api/tasks/:id` | Update task status | Task ID in URL |
| DELETE | `/api/tasks/:id` | Delete task | Task ID in URL |
| POST | `/api/users/login` | User login | Credentials in body |
| POST | `/api/users/register` | User registration | User data in body |

---

## Testing Checklist

### Test Case 1: User A Creates Tasks
- [ ] User A logs in successfully
- [ ] User A creates a task
- [ ] Task appears in User A's task list
- [ ] Task has User A's ID in database

### Test Case 2: User A Logs Out
- [ ] User A clicks logout
- [ ] User A is redirected to login page
- [ ] localStorage is cleared of user and tasks
- [ ] Redux state is cleared

### Test Case 3: User B Logs In
- [ ] User B logs in successfully
- [ ] **Only User B's tasks are displayed** (NOT User A's tasks)
- [ ] User B's task list is fetched from backend

### Test Case 4: Task Operations
- [ ] User B can create new tasks
- [ ] User B can mark tasks as completed
- [ ] User B can delete tasks
- [ ] New tasks are persisted to database with User B's ID

### Test Case 5: Switch Users
- [ ] User A logs in → sees User A's tasks
- [ ] User A logs out
- [ ] User B logs in → sees only User B's tasks
- [ ] No task mixing between users

---

## Configuration Notes

### Frontend Requirements
- Ensure `http://localhost:5000` is the correct backend URL
- If backend runs on different port/URL, update all fetch calls in `TaskPage.tsx`

### Backend Requirements
- Ensure MongoDB connections are working for both User and Task databases
- Ensure JWT_SECRET is set in `.env` file
- Task model must include `userId` field (already configured)
- User model must have proper indexing on email/name fields

---

## Migration Notes

No database migration required as the Task model already had the `userId` field configured. Existing tasks without userId will not be accessible through the filtered endpoint.

---

## Files Modified Summary

**Frontend Files**:
- `frontend/src/redux/taskSlice.ts`
- `frontend/src/redux/authSlice.ts`
- `frontend/src/components/Task Page/TaskPage.tsx`
- `frontend/src/components/TaskList.tsx`
- `frontend/src/components/Completed Tasks/CompleteTasks.tsx`
- `frontend/src/types/User.ts`

**Backend Files**:
- `backend/Controllers/User Controller/loginUser.controller.js`
- `backend/Controllers/User Controller/registerUser.controller.js`

**Total Files Modified**: 8

---

## Rollback Instructions

If needed, revert changes by:
1. Restore `taskSlice.ts` to use array indices instead of task IDs
2. Remove `setTasks` and `clearTasks` actions
3. Restore `TaskPage.tsx` to local-only task management
4. Restore all components to use array indices
5. Remove `userId` from task creation on frontend
6. Backend changes can remain (they only add more data to responses)

---

## Future Improvements

1. Add error handling and user-friendly error messages
2. Add loading states while fetching tasks
3. Implement token refresh for JWT expiration
4. Add optimistic updates to reduce latency
5. Add task pagination for users with many tasks
6. Add real-time updates via WebSocket or polling
7. Add task categories/projects with sharing capabilities
8. Add task search and filtering

---

**End of Documentation**
