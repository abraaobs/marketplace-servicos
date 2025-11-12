"use client";
import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function PainelPrestador() {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({
    title: "",
    description: "",
    price: "",
    image: null, // arquivo local
  });

  const [newService, setNewService] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });

  // === Carrega serviços do prestador ===
  useEffect(() => {
    if (user) fetchServices();
  }, [user]);

  async function fetchServices() {
    try {
      const res = await api.get(`/services/provider/${user.id}`);
      setServices(res.data);
    } catch (err) {
      console.error("Erro ao carregar serviços:", err);
    }
  }

  // === Adicionar novo serviço (POST com FormData) ===
  async function handleAddService(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", newService.title);
    formData.append("description", newService.description);
    formData.append("price", newService.price);
    formData.append("providerId", user.id);
    if (newService.image) formData.append("image", newService.image);

    try {
      const res = await api.post("/services", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setServices([...services, res.data]);

      setNewService({
        title: "",
        description: "",
        price: "",
        image: null,
      });

    } catch (err) {
      console.error("Erro ao criar serviço:", err);
      alert("Erro ao criar serviço.");
    }
  }

  // === Excluir serviço ===
  async function handleDelete(id) {
    if (!confirm("Tem certeza que deseja excluir este serviço?")) return;

    try {
      await api.delete(`/services/${id}`);
      setServices(services.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Erro ao excluir serviço:", err);
      alert("Erro ao excluir serviço.");
    }
  }

  // === Modo de edição ===
  function startEditing(service) {
    setEditingId(service.id);
    setEditData({
      title: service.title,
      description: service.description,
      price: service.price,
      image: null, // novo arquivo será colocado aqui
    });
  }

  // === Cancelar edição ===
  function cancelEditing() {
    setEditingId(null);
    setEditData({ title: "", description: "", price: "", image: null });
  }

  // === Confirmar edição (PUT com FormData) ===
  async function handleEditSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", editData.title);
    formData.append("description", editData.description);
    formData.append("price", editData.price);

    if (editData.image) {
      formData.append("image", editData.image);
    }

    try {
      const res = await api.put(`/services/${editingId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setServices(services.map((s) =>
        s.id === editingId ? res.data.service : s
      ));

      cancelEditing();

    } catch (err) {
      console.error("Erro ao atualizar serviço:", err);
      alert("Erro ao atualizar serviço.");
    }
  }

  return (
    <div className="painel-container">
      <h1>Meus Serviços</h1>

      {/* === Formulário de novo serviço === */}
      <form onSubmit={handleAddService} className="service-form">
        <input
          type="text"
          placeholder="Título"
          value={newService.title}
          onChange={(e) => setNewService({ ...newService, title: e.target.value })}
          required
        />

        <textarea
          placeholder="Descrição"
          value={newService.description}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Preço"
          value={newService.price}
          onChange={(e) => setNewService({ ...newService, price: e.target.value })}
          required
        />

        {/* UPLOAD LOCAL */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setNewService({ ...newService, image: e.target.files[0] })
          }
        />

        <button type="submit">Adicionar Serviço</button>
      </form>

      {/* === Lista de serviços === */}
      <div className="services-list">
        {services.length === 0 ? (
          <p>Nenhum serviço cadastrado ainda.</p>
        ) : (
          services.map((service) =>
            editingId === service.id ? (
              // === MODO DE EDIÇÃO ===
              <form
                key={service.id}
                onSubmit={handleEditSubmit}
                className="edit-form"
              >
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  required
                />

                <textarea
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  required
                />

                <input
                  type="number"
                  value={editData.price}
                  onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                  required
                />

                {/* UPLOAD DE NOVA IMAGEM AO EDITAR */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setEditData({ ...editData, image: e.target.files[0] })
                  }
                />

                <div className="edit-buttons">
                  <button type="submit">Salvar</button>
                  <button type="button" onClick={cancelEditing} className="cancel">
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              // === CARD NORMAL ===
              <div key={service.id} className="service-card">
                <img
                  src={
                    service.image
                      ? `http://localhost:5000${service.image}`
                      : "https://via.placeholder.com/300x200"
                  }
                  alt={service.title}
                  className="service-image"
                />

                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <p>
                  <strong>R$ {Number(service.price).toFixed(2)}</strong>
                </p>

                <div className="service-actions">
                  <button onClick={() => startEditing(service)}>Editar</button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="delete"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
