// frontend/src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("🔹 Inicializando AuthContext...");
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    console.log("📦 Token existente:", savedToken);
    console.log("📦 Usuário existente:", savedUser);

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    console.log("🚀 Iniciando login no AuthContext...");
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("🌐 Requisição enviada. Aguardando resposta...");
      const data = await response.json();
      console.log("📥 Resposta recebida do backend:", data);

      if (!response.ok) {
        console.warn("⚠️ Erro no login:", data.message);
        return { ok: false, message: data.message || "Erro no login" };
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      console.log("✅ Login bem-sucedido!");
      console.log("🧠 Usuário salvo:", data.user);
      console.log("🔐 Token salvo:", data.token);

      return { ok: true, user: data.user };
    } catch (error) {
      console.error("💥 Erro na função login:", error);
      return { ok: false, message: "Erro de rede" };
    }
  };

  const logout = () => {
    console.log("🚪 Logout executado. Limpando localStorage.");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
