import React, { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import "./Contratados.css";

export default function Contratados() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  async function fetchOrders() {
    try {
      const res = await api.get(`/orders/customer/${user.id}`);
      setOrders(res.data);
    } catch (err) {
      console.error("Erro ao buscar pedidos:", err);
    }
  }

  return (
    <div className="contratados-container">
      <h1>Serviços Contratados</h1>

      {orders.length === 0 ? (
        <p>Você ainda não contratou nenhum serviço.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">

              {/* IMAGEM */}
              {order.service.image && (
                <img
                  src={
                    order.service.image.startsWith("/uploads")
                      ? `http://localhost:5000${order.service.image}`
                      : order.service.image
                  }
                  alt={order.service.title}
                  className="order-image"
                />
              )}

              <div className="order-info">
                <h3>{order.service.title}</h3>
                <p>{order.service.description}</p>
                <p><strong>Preço:</strong> R$ {order.service.price}</p>
                <p><strong>Status:</strong> {order.status}</p>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
