import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ClientDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  // Carregar pedidos do cliente
  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  async function fetchOrders() {
    try {
      const res = await api.get(`/orders/customer/${user.id}`);
      setOrders(res.data);
    } catch (err) {
      console.error("Erro ao buscar pedidos do cliente:", err);
    }
  }

  return (
    <div className="dashboard-container">
      <h1>👤 Painel do Cliente</h1>
      <p>
        Bem-vindo ao seu painel! Aqui você pode acompanhar seus serviços contratados.
      </p>

      {/* ================================
          SERVIÇOS CONTRATADOS (preview)
      ================================= */}
      <section className="dashboard-section">
        <h2>Serviços Contratados</h2>

        {orders.length === 0 ? (
  <p>Você ainda não contratou nenhum serviço.</p>
) : (
  <div className="services-grid">
    {orders.slice(0, 3).map((order) => (
      <div key={order.id} className="service-card">
        
        {order.service.image && (
          <img
            src={order.service.image}
            alt={order.service.title}
            className="service-image"
            style={{
              width: "100%",
              borderRadius: "12px",
              marginBottom: "10px"
            }}
          />
        )}

        <h3>{order.service.title}</h3>

        <p>
          <strong>Preço:</strong> R$ {Number(order.service.price).toFixed(2)}
        </p>

        <p>
          <strong>Prestador:</strong> {order.service.provider?.name ?? "Desconhecido"}
        </p>

        <p>
          <strong>Status:</strong> {order.status}
        </p>
      </div>
    ))}
  </div>
)}


        <button className="btn-primary" onClick={() => navigate("/contratados")}>
          Ver todos os contratados
        </button>
      </section>

      {/* ================================
          HISTÓRICO (placeholder)
      ================================= */}
      <section className="dashboard-section">
        <h2>Histórico de Pedidos</h2>
        <p>Veja o andamento e os detalhes dos serviços anteriores.</p>
        <button className="btn-primary">Ver Histórico Completo</button>
      </section>
    </div>
  );
}
