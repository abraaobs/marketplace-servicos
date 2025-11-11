import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientDashboard from "./pages/ClientDashboard";
import ProviderDashboard from "./pages/PainelPrestador";
import PainelPrestador from "./pages/PainelPrestador";

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div>
      <nav style={{ padding: "10px", background: "#0c2d57" }}>
        <Link style={{ color: "#fff", marginRight: "15px" }} to="/">Home</Link>

        {user ? (
          <>
            {user.role === "cliente" && (
              <Link style={{ color: "#fff", marginRight: "15px" }} to="/painel-cliente">
                Painel Cliente
              </Link>
            )}
            {user.role === "prestador" && (
              <Link style={{ color: "#fff", marginRight: "15px" }} to="/painel-prestador">
                Painel Prestador
              </Link>
            )}
            <button onClick={logout} style={{ marginLeft: "15px" }}>
              Sair
            </button>
          </>
        ) : (
          <>
            <Link style={{ color: "#fff", marginRight: "15px" }} to="/login">
              Login
            </Link>
            <Link style={{ color: "#fff" }} to="/register">
              Cadastro
            </Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {user && user.role === "cliente" && (
          <Route path="/painel-cliente" element={<ClientDashboard />} />
        )}
        {user && user.role === "prestador" && (
          <Route path="/painel-prestador" element={<PainelPrestador />} />
        )}
      </Routes>
    </div>
  );
}
