import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getServices } from "../api";
import "./Home.css";

export default function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  return (
    <div className="home-container">
      <h2 className="home-title">Serviços disponíveis</h2>

      <div className="services-grid">
        {services.map((s) => (
          <Link key={s.id} to={`/service/${s.id}`} className="service-card">
            <img src={s.image} alt={s.title} className="service-image" />
            <div className="service-info">
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <span>R$ {s.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
