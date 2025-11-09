// frontend/src/pages/PainelPrestador.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function PainelPrestador() {
  const { user, logout } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/services/meus", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Erro ao buscar serviços");
        } else {
          setServices(data);
        }
      } catch (err) {
        setError("Erro de rede");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto" }}>
      <h2>Bem-vindo, {user?.name}</h2>
      <p>Seus serviços cadastrados:</p>

      {services.length === 0 ? (
        <p>Nenhum serviço encontrado.</p>
      ) : (
        <ul>
          {services.map((s) => (
            <li key={s.id}>
              <strong>{s.title}</strong> — R${s.price}
              <br />
              <small>{s.description}</small>
            </li>
          ))}
        </ul>
      )}

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
