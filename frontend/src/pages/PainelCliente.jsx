// frontend/src/pages/PainelCliente.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";

export default function PainelCliente() {
  const { user, logout } = useAuth();

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Bem-vindo, {user?.name || "Cliente"}</h2>
      <p>Você está logado como cliente.</p>

      <p>
        Aqui futuramente você poderá visualizar serviços disponíveis, contratar prestadores e gerenciar seus pedidos.
      </p>

      <button
        onClick={logout}
        style={{
          marginTop: "20px",
          backgroundColor: "#0c2d57",
          color: "white",
          padding: "10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Sair
      </button>
    </div>
  );
}
