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
          <ul className="dashboard-list">
            {orders.slice(0, 3).map((order) => (
              <li key={order.id} className="dashboard-item">
                <strong>{order.service.title}</strong>
                <span>Status: {order.status}</span>
              </li>
            ))}
          </ul>
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
