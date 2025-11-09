import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("cliente");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // simulação ou chamada real
      await axios.post("/api/auth/register", { name, email, password, role });
      alert("Cadastro realizado com sucesso!");
      navigate("/login"); // ✅ redireciona para login
    } catch (err) {
      console.error(err);
      setError("Erro ao cadastrar usuário.");
    }
  };

  return (
    <div className="card" style={{ padding: "2rem", maxWidth: 400, margin: "3rem auto" }}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>Criar Conta</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label><br />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>Email</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>Senha</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label>Tipo de usuário</label><br />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: "100%", padding: "0.5rem" }}
          >
            <option value="cliente">Cliente</option>
            <option value="prestador">Prestador</option>
          </select>
        </div>

        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: "1.5rem",
            backgroundColor: "#0c2d57",
            color: "white",
            padding: "0.6rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
