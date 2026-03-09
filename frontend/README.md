# Frontend - Personal Task Manager

A modern, responsive React-based frontend for a personalized task management application built with TypeScript, Vite, and FullCalendar.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Components](#components)
- [Styling](#styling)
- [Types](#types)
- [Development](#development)
- [Build](#build)

## 🎯 Overview

This is the frontend application for the Personal Task Manager - a full-featured task management system that allows users to create, update, delete, and organize their tasks with an intuitive calendar interface. The application supports user authentication (login/registration) and provides a seamless user experience for task management.

## 🛠️ Tech Stack

- **React** ^19.2.0 - UI library
- **TypeScript** ~5.9.3 - Type-safe JavaScript
- **Vite** ^7.3.1 - Next-generation build tool
- **React Router DOM** ^7.13.1 - Client-side routing
- **FullCalendar** ^6.1.20 - Calendar component
  - @fullcalendar/react
  - @fullcalendar/daygrid
- **ESLint** ^9.39.1 - Code linting
- **React Refresh** - Fast module replacement

## ✨ Features

- **User Authentication**
  - User registration with validation
  - Secure login system
  - JWT-based authentication

- **Task Management**
  - Create new tasks
  - Update existing tasks
  - Delete tasks
  - View personal tasks list
  - Task filtering and organization

- **Calendar View**
  - Interactive calendar interface
  - Day grid view using FullCalendar
  - Visual task scheduling

- **Responsive Design**
  - Mobile-friendly interface
  - Optimized for all screen sizes
  - Clean and intuitive UI

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Backend server** running (see backend README)

## 🚀 Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

   Or if using yarn:
   ```bash
   yarn install
   ```

3. **Configure environment (if needed):**
   Create a `.env` file in the frontend directory if you need custom API endpoints or configurations.

## 📂 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── CalendarView.tsx       # Calendar component
│   │   ├── TaskForm.tsx           # Task creation/edit form
│   │   ├── TaskItem.tsx           # Individual task display
│   │   ├── TaskList.tsx           # Task list container
│   │   ├── Login Page/
│   │   │   └── Login.tsx          # Login page
│   │   ├── Register Page/
│   │   │   └── Register.tsx       # Registration page
│   │   └── Task Page/
│   │       └── TaskPage.tsx       # Main task management page
│   ├── Styles/            # CSS stylesheets
│   │   ├── Auth.style.css         # Authentication styles
│   │   └── Task.style.css         # Task management styles
│   ├── types/             # TypeScript type definitions
│   │   └── Tasks.ts               # Task type definitions
│   ├── assets/            # Images, icons, etc.
│   ├── App.tsx            # Main App component
│   ├── main.tsx           # App entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── tsconfig.app.json      # App-specific TypeScript config
├── tsconfig.node.json     # Node-specific TypeScript config
├── eslint.config.js       # ESLint configuration
└── package.json           # Project dependencies
```

## 📜 Available Scripts

### Development Server

```bash
npm run dev
```
Starts the Vite development server. The app will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
```
Builds the application for production. TypeScript compilation followed by Vite optimization.

### Preview Production Build

```bash
npm run preview
```
Locally preview the production build.

### Lint Code

```bash
npm run lint
```
Runs ESLint to check code quality and identify issues.

## 🧩 Components

### CalendarView.tsx
Displays an interactive calendar interface using FullCalendar. Shows tasks scheduled on specific dates.

### TaskForm.tsx
Form component for creating and updating tasks. Includes validation and error handling.

### TaskItem.tsx
Renders individual task cards with options to edit or delete tasks.

### TaskList.tsx
Container component that displays all user tasks in a list format.

### Login.tsx
Authentication page for user login with email and password validation.

### Register.tsx
Registration page for new users to create an account.

### TaskPage.tsx
Main page combining calendar view, task list, and task management functionality.

## 🎨 Styling

The application uses CSS with a modular structure:

- **Auth.style.css** - Styles for authentication pages (Login, Register)
- **Task.style.css** - Styles for task management interface
- **index.css** - Global styles and variables

## 📝 Types

### Tasks.ts
Contains TypeScript interfaces and types related to tasks:
- Task interface definition
- User interface definition
- API request/response types

## 💻 Development

### Adding a New Component

1. Create a new `.tsx` file in the `src/components/` directory
2. Define the component with proper TypeScript types
3. Import and use in other components or pages

### Adding Styles

1. Create or modify CSS files in `src/Styles/`
2. Import the stylesheet in your component: `import '../Styles/Task.style.css'`
3. Use BEM or similar naming conventions for consistency

### TypeScript Types

Always define proper TypeScript types in `src/types/Tasks.ts` for:
- Props passed to components
- API response data
- Application state

## 🔧 Configuration Files

### vite.config.ts
Vite build configuration with React plugin support.

### tsconfig.json
TypeScript compiler options for the application.

### eslint.config.js
ESLint rules for code quality and consistency.

## 📚 API Integration

The frontend communicates with the backend API for:
- User registration and login
- Task CRUD operations (Create, Read, Update, Delete)
- User data retrieval

Ensure the backend server is running on the configured API endpoint.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Notes

- The application uses JWT tokens for authentication
- Tasks are fetched and managed through API calls to the backend
- State management can be enhanced with Redux or Context API as the app grows
- Consider adding tests using Jest or Vitest

## 🤝 Contributing

When contributing to the frontend:
1. Follow TypeScript best practices
2. Maintain consistent code style with ESLint
3. Create reusable components
4. Document complex component logic

## 📄 License

This project is part of the Personal Task Manager application.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
