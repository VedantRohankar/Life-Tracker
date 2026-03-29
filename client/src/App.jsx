import React from 'react'
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Daily from './pages/Daily';

import Streak from "./pages/Streak";
import Progress from "./pages/Progress";
import Rank from "./pages/Rank";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>

      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/daily"
        element={
          <ProtectedRoute>
            <Daily/>
          </ProtectedRoute>
        }
      />

      <Route
        path="/streak"
        element={
          <ProtectedRoute>
            <Streak />
          </ProtectedRoute>
        }
      />

      <Route
        path="/progress"
        element={
          <ProtectedRoute>
            <Progress />
          </ProtectedRoute>
        }
      />

      <Route
        path="/rank"
        element={
          <ProtectedRoute>
            <Rank />
          </ProtectedRoute>
        }
      />
      <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>


    </Routes>
  )
}

export default App;
