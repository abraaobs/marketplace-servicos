import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ClientDashboard from "./pages/ClientDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import Home from "./pages/Home";

export default function App() {
  return (
    <div>
      <nav style={{ padding: "10px", background: "#0c2d57" }}>
        <Link style={{ color: "#fff", marginRight: "15px" }} to="/">Home</Link>
        <Link style={{ color: "#fff", marginRight: "15px" }} to="/painel-cliente">Painel Cliente</Link>
        <Link style={{ color: "#fff" }} to="/painel-prestador">Painel Prestador</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/painel-cliente" element={<ClientDashboard />} />
        <Route path="/painel-prestador" element={<ProviderDashboard />} />
      </Routes>
    </div>
  );
}
