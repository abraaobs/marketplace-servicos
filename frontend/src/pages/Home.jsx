import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/services");
        setServices(res.data);
      } catch (err) {
        console.error("Erro ao buscar serviços:", err);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="home-container">
      {/* SERVIÇOS DO BACKEND */}
      <section className="services-section">
        <h2 className="services-title">Serviços disponíveis</h2>
        <div className="services-grid">
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service.id} className="service-card">
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="service-image"
                  />
                )}
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <p>
                  <strong>Preço:</strong> R$ {service.price}
                </p>
                {service.provider && (
                  <p className="provider-name">
                    Prestador: {service.provider.name}
                  </p>
                )}
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
