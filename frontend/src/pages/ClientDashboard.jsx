import React from "react";
import "./Dashboard.css";

export default function ClientDashboard() {
  return (
    <div className="dashboard-container">
      <h1>👤 Painel do Cliente</h1>
      <p>Bem-vindo ao seu painel, aqui você pode acompanhar seus serviços contratados.</p>

      <section className="dashboard-section">
        <h2>Serviços Contratados</h2>
        <ul className="dashboard-list">
        </ul>
      </section>

      <section className="dashboard-section">
        <h2>Histórico de Pedidos</h2>
        <p>Veja o andamento e os detalhes dos serviços anteriores.</p>
        <button className="btn-primary">Ver Histórico Completo</button>
      </section>
    </div>
  );
}
