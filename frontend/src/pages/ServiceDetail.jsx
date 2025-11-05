import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ServiceDetail.css";

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/services/${id}`)
      .then((res) => res.json())
      .then(setService);
  }, [id]);

  if (!service) return <p>Carregando...</p>;

  return (
    <div className="detail-container">
      <img src={service.image} alt={service.title} className="detail-image" />
      <h2>{service.title}</h2>
      <p>{service.description}</p>
      <strong>Preço: R$ {service.price}</strong>
      <br />
      <Link to="/" className="back-btn">← Voltar</Link>
    </div>
  );
}
