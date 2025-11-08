import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getServices } from "../api";
import CategoryGrid from "../components/CategoryGrid";
import "./Home.css";

export default function Home() {
  const [services, setServices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getServices().then((data) => {
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.services)
        ? data.services
        : [];
      setServices(list);
      setFiltered(list);
    });
  }, []);

  // 🔎 Filtro por categoria (acionado pelos cards grandes)
  const handleCategory = (category) => {
    if (!category) {
      setSelectedCategory(null);
      setFiltered(services);
      return;
    }

    setSelectedCategory(category);
    setFiltered(
      services.filter((s) =>
        s.category?.toLowerCase().includes(category.toLowerCase())
      )
    );
  };

  // 🔍 Filtro de busca
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFiltered(
      services.filter(
        (s) =>
          s.title.toLowerCase().includes(term) ||
          s.description.toLowerCase().includes(term)
      )
    );
  };

  return (
    <div className="home-container">
      <section className="hero-section text-center text-white py-5">
        <div className="container">
          <h1 className="display-5 fw-bold">
            Soluções completas para sua casa ou negócio 🏠🔧
          </h1>
          <p className="lead mt-3">
            Jardinagem, obras, encanamento, pintura e reparos — tudo no mesmo
            lugar. <br />
            Com o <strong>Marketserv</strong>, o profissional ideal está a um clique de distância!
          </p>
        </div>
      </section>

      {/* 🧱 Grade de categorias com ícones grandes */}
      <CategoryGrid onSelectCategory={handleCategory} />

      {/* 🔍 Barra de pesquisa */}
      <div className="search-bar mt-4 mb-4 text-center">
        <input
          type="text"
          placeholder="Pesquisar serviços..."
          value={searchTerm}
          onChange={handleSearch}
          className="form-control w-75 mx-auto"
        />
      </div>

      {/* 🧾 Lista de serviços */}
      <div className="container mt-5">
        <h3 className="text-center mb-4">
          {selectedCategory ? `Serviços em ${selectedCategory}` : "Todos os Serviços"}
        </h3>

        <div className="row g-4">
          {filtered.length > 0 ? (
            filtered.map((s) => (
              <div key={s.id} className="col-md-4">
                <Link to={`/service/${s.id}`} className="text-decoration-none">
                  <div className="card h-100 shadow-sm border-0">
                    <img
                      src={s.image || "https://via.placeholder.com/300x200"}
                      alt={s.title}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title text-dark">{s.title}</h5>
                      <p className="card-text text-muted">{s.description}</p>
                      <span className="fw-bold text-primary">R$ {s.price}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">
              Nenhum serviço encontrado.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
