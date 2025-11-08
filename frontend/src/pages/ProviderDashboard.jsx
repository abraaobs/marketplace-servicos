import React, { useState } from "react";
import "./Dashboard.css";

export default function ProviderDashboard() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="dashboard-container">
      <h1>🔧 Painel do Prestador</h1>
      <p>Bem-vindo, profissional! Aqui você pode gerenciar seus serviços e pedidos.</p>

      <section className="dashboard-section">
        <h2>Meus Serviços</h2>
        <p>Gerencie ou adicione novos serviços que você oferece.</p>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Fechar formulário" : "Cadastrar Novo Serviço"}
        </button>

        {showForm && (
          <div className="form-container">
            <h3>Novo Serviço</h3>
            <form>
              <label>Título</label>
              <input type="text" placeholder="Ex: Pintura residencial" />

              <label>Descrição</label>
              <textarea placeholder="Descreva brevemente o serviço"></textarea>

              <label>Preço (R$)</label>
              <input type="number" step="0.01" placeholder="Ex: 150.00" />

              <button type="submit" className="btn-primary">Salvar Serviço</button>
            </form>
          </div>
        )}
      </section>

      <section className="dashboard-section">
        <h2>Pedidos Recebidos</h2>
        <p>Veja quem contratou seus serviços e acompanhe os status.</p>
      </section>
    </div>
  );
}
