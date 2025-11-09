import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Seção principal (hero) */}
      <section className="hero">
        <div className="hero-content">
          <h1>Soluções completas para sua casa ou negócio 🏠🔧</h1>
          <p>
            Jardinagem, obras, encanamento, pintura e reparos — tudo no mesmo lugar. <br />
            Com o <strong>Marketserv</strong>, o profissional ideal está a um clique de distância!
          </p>
          <button
            className="hero-button"
            onClick={() => navigate("/login")}
          >
            Ir para Login
          </button>
        </div>
      </section>

      {/* Seção de serviços */}
      <section className="services-section">
        <h2 className="services-title">Nossos Serviços 🛠️🌿💡</h2>

        <div className="services-grid">
          <div className="service-card">
            <i className="icon">🖌️</i>
            <h3>Pintura & Reforma</h3>
            <p>Deixe seu ambiente renovado com profissionais qualificados.</p>
          </div>

          <div className="service-card">
            <i className="icon">🔧</i>
            <h3>Reparos Gerais</h3>
            <p>Montagem, ajustes e consertos para o lar e escritório.</p>
          </div>

          <div className="service-card">
            <i className="icon">🌼</i>
            <h3>Jardinagem & Manutenção</h3>
            <p>Cuide do seu jardim e área externa com quem entende do assunto.</p>
          </div>

          <div className="service-card">
            <i className="icon">💧</i>
            <h3>Encanamento</h3>
            <p>Conserto de vazamentos, instalações e manutenção hidráulica.</p>
          </div>

          <div className="service-card">
            <i className="icon">💡</i>
            <h3>Serviços Elétricos</h3>
            <p>Troca de tomadas, iluminação e manutenção geral elétrica.</p>
          </div>

          <div className="service-card">
            <i className="icon">🏠</i>
            <h3>Reparos em Móveis</h3>
            <p>
              Ajuste, montagem e restauração de móveis com qualidade e confiança.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
