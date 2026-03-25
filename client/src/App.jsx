import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Daily from './pages/Daily'
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

    </Routes>
  )
}

export default App