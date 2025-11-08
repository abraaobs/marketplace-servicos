import React from "react";
import "./CategoryGrid.css";

export default function CategoryGrid({ onSelectCategory }) {
  const categories = [
    {
      name: "Pintura & Reforma",
      icon: "bi-brush",
      desc: "Deixe seu ambiente renovado com profissionais qualificados.",
    },
    {
      name: "Reparos Gerais",
      icon: "bi-tools",
      desc: "Montagem, ajustes e consertos para o lar e escritório.",
    },
    {
      name: "Jardinagem & Manutenção",
      icon: "bi-flower1",
      desc: "Cuide do seu jardim e área externa com quem entende do assunto.",
    },
    {
      name: "Encanamento",
      icon: "bi-droplet",
      desc: "Conserto de vazamentos, instalações e manutenção hidráulica.",
    },
    {
      name: "Serviços Elétricos",
      icon: "bi-lightbulb",
      desc: "Troca de tomadas, iluminação e manutenção geral elétrica.",
    },
    {
      name: "Reparos em Móveis",
      icon: "bi-house-door",
      desc: "Ajuste, montagem e restauração de móveis com qualidade e confiança.",
    },
  ];

  return (
    <section id="servicos" className="py-5 bg-white">
      <div className="container">
        <h2 className="text-center fw-bold mb-5" style={{ color: "#0a1f44" }}>
          Nossos Serviços 🔨🌿💡
        </h2>
        <div className="row g-4">
          {categories.map((cat) => (
            <div key={cat.name} className="col-md-4">
              <div
                className="card h-100 shadow-sm border-0 category-card"
                onClick={() => onSelectCategory(cat.name)}
                style={{ cursor: "pointer" }}
              >
                <div className="card-body text-center">
                  <i
                    className={`bi ${cat.icon} display-5`}
                    style={{ color: "#0a1f44" }}
                  ></i>
                  <h5 className="mt-3">{cat.name}</h5>
                  <p>{cat.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <button
            className="btn btn-outline-primary"
            onClick={() => onSelectCategory(null)}
          >
            Outros Serviços
          </button>
        </div>
      </div>
    </section>
  );
}
