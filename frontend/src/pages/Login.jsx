// frontend/src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ usa o login do AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("🟢 handleSubmit foi chamado!");
    console.log("📩 Email:", email);
    console.log("🔑 Senha:", password);

    const result = await login(email, password);
    console.log("📦 Resultado do login:", result);

    if (!result.ok) {
      setError(result.message || "Erro no login");
      alert("❌ Falha no login: " + (result.message || "Erro desconhecido"));
      return;
    }

    const user = result.user;
    console.log("✅ Login OK! Redirecionando para:", user?.role);

    // Redireciona conforme o tipo de usuário
    if (user?.role === "prestador") {
      alert("🧭 Redirecionando para /painel-prestador");
      navigate("/painel-prestador");
    } else if (user?.role === "cliente") {
      alert("🧭 Redirecionando para /painel-cliente");
      navigate("/painel-cliente");
    } else {
      alert("🧭 Redirecionando para /");
      navigate("/");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "2rem auto" }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />

        <label>Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
        />

        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#0c2d57",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
