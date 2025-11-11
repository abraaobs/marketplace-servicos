// frontend/src/pages/PainelPrestador.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

export default function PainelPrestador() {
  const { user, logout } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  // 🔍 Buscar serviços do prestador logado
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/services/provider/${user.id}`
        );
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Erro ao buscar serviços do prestador");
        } else {
          setServices(data);
        }
      } catch (err) {
        console.error(err);
        setError("Erro de rede ao buscar serviços");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchServices();
  }, [user]);

  // ➕ Cadastrar novo serviço
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          providerId: user.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Erro ao cadastrar serviço");

      alert("✅ Serviço cadastrado com sucesso!");
      setForm({ title: "", description: "", price: "", image: "" });
      setShowForm(false);
      setServices((prev) => [...prev, data]);
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar serviço.");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="dashboard-container">
      <h1>🔧 Painel do Prestador</h1>
      <p>Bem-vindo, {user?.name}! Aqui você gerencia seus serviços e pedidos.</p>

      {/* === Serviços do prestador === */}
      <section className="dashboard-section">
        <h2>Meus Serviços</h2>
        <p>Gerencie ou adicione novos serviços que você oferece.</p>

        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Fechar formulário" : "Cadastrar Novo Serviço"}
        </button>

        {showForm && (
          <div className="form-container">
            <h3>Novo Serviço</h3>
            <form onSubmit={handleSubmit}>
              <label>Título</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Ex: Pintura residencial"
                required
              />

              <label>Descrição</label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Descreva brevemente o serviço"
                required
              ></textarea>

              <label>Preço (R$)</label>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="Ex: 150.00"
                required
              />

              <label>Imagem (URL opcional)</label>
              <input
                type="text"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://exemplo.com/imagem.jpg"
              />

              <button type="submit" className="btn-primary">
                Salvar Serviço
              </button>
            </form>
          </div>
        )}

        <div className="services-list">
          {services.length === 0 ? (
            <p>Nenhum serviço cadastrado ainda.</p>
          ) : (
            services.map((s) => (
              <div key={s.id} className="service-card">
                <img
                  src={s.image || "https://via.placeholder.com/200x150"}
                  alt={s.title}
                  className="service-image"
                />
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.description}</p>
                  <strong>R$ {s.price}</strong>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* === Pedidos (em breve) === */}
      <section className="dashboard-section">
        <h2>Pedidos Recebidos</h2>
        <p>Em breve você poderá ver e gerenciar os pedidos aqui.</p>
      </section>

      <button
        onClick={logout}
        className="btn-primary"
        style={{ marginTop: "20px", backgroundColor: "#b00020" }}
      >
        Sair
      </button>
    </div>
  );
}
