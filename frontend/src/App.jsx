import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import "./App.css";
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import "./App.css";
import ServiceDetail from "./pages/ServiceDetail";



export default function App() {
  return (
    <div>
      <header className="card header">
  <div><strong>Marketserv</strong></div>
  <nav>
    <Link className="nav-btn" to="/">Home</Link>
    <Link className="nav-btn" to="/login">Login</Link>
    <Link className="nav-btn" to="/register">Cadastrar</Link>
  </nav>
</header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/service/:id" element={<ServiceDetail />} />
        </Routes>
      </main>
    </div>
  )
}
