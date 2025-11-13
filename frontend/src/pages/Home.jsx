import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";

export default function Home() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [services, setServices] = useState([]);
  const [dolar, setDolar] = useState(null);
  const [euro, setEuro] = useState(null);
  const [bitcoin, setBitcoin] = useState(null);

  // Carregar serviços
  useEffect(() => {

  // Buscar serviços
  const fetchServices = async () => {
    try {
      const res = await api.get("/services");
      setServices(res.data);
    } catch (err) {
      console.error("Erro ao buscar serviços:", err);
    }
  };
  fetchServices();

  // DÓLAR
  const fetchDolar = async () => {
    try {
      const res = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL");
      const data = await res.json();
      setDolar(data.USDBRL.bid);
    } catch (err) {
      console.error("Erro ao buscar dólar:", err);
    }
  };

  // EURO
  const fetchEuro = async () => {
    try {
      const res = await fetch("https://economia.awesomeapi.com.br/json/last/EUR-BRL");
      const data = await res.json();
      setEuro(data.EURBRL.bid);
    } catch (err) {
      console.error("Erro ao buscar euro:", err);
    }
  };

  // BITCOIN
  const fetchBitcoin = async () => {
    try {
      const res = await fetch("https://economia.awesomeapi.com.br/json/last/BTC-BRL");
      const data = await res.json();
      setBitcoin(data.BTCBRL.bid);
    } catch (err) {
      console.error("Erro ao buscar bitcoin:", err);
    }
  };

  fetchDolar();
  fetchEuro();
  fetchBitcoin();

}, []);



  // 👉 Função para contratar um serviço
  async function contratar(serviceId) {
    if (!isAuthenticated) {
      alert("Você precisa fazer login para contratar um serviço.");
      return navigate("/login");
    }

    try {
      await api.post("/orders", {
        serviceId,
        customerId: user.id
      });

      alert("Pedido enviado com sucesso!");
    } catch (err) {
      console.error("Erro ao contratar:", err);
      alert("Erro ao enviar pedido.");
    }
  }

  return (
    <div className="home-container">
{dolar && euro && bitcoin && (
  <div className="cotacoes-container">
    <span>💵USD: <strong>R$ {Number(dolar).toFixed(2)}</strong></span>
    <span>💶EUR: <strong>R$ {Number(euro).toFixed(2)}</strong></span>
    <span>🪙BTC: <strong>R$ {Number(bitcoin).toLocaleString("pt-BR")}</strong></span>
  </div>
)}

      <section className="services-section">
        <h2 className="services-title">Serviços disponíveis</h2>

        <div className="services-grid">
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service.id} className="service-card">

                {/* Imagem corrigida para uploads locais */}
                {service.image && (
                  <img
                    src={
                      service.image.startsWith("/uploads")
                        ? `http://localhost:5000${service.image}`
                        : service.image
                    }
                    alt={service.title}
                    className="service-image"
                  />
                )}

                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <p><strong>Preço:</strong> R$ {service.price}</p>

                {service.provider && (
                  <p className="provider-name">
                    Prestador: {service.provider.name}
                  </p>
                )}

                {/* 👉 Botão CONTRATAR */}
                <button
                  className="hire-button"
                  onClick={() => contratar(service.id)}
                >
                  Contratar
                </button>

              </div>
            ))
          ) : (
            <p>Nenhum serviço disponível no momento.</p>
          )}
        </div>
      </section>
    </div>
  );
}
