// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Log para verificar se o arquivo carrega
console.log("🚀 main.tsx carregado");

// Verificar se root existe
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("❌ Elemento #root não encontrado!");
  document.body.innerHTML = '<div style="padding: 20px; color: red;">ERRO: Elemento #root não encontrado no DOM</div>';
} else {
  console.log("✅ Elemento #root encontrado");
  
  try {
    console.log("📦 Criando ReactDOM root...");
    const root = ReactDOM.createRoot(rootElement);
    
    console.log("🎨 Renderizando App...");
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("✅ App renderizado com sucesso!");
  } catch (error) {
    console.error("❌ ERRO ao renderizar:", error);
    document.body.innerHTML = `
      <div style="padding: 20px; font-family: monospace; background: #1a1a1a; color: #fff;">
        <h1 style="color: #ff5555;">❌ Erro ao renderizar App</h1>
        <pre style="background: #000; padding: 10px; overflow: auto;">${error}</pre>
        <p style="margin-top: 20px; color: #888;">Abra o Console (F12) para mais detalhes</p>
      </div>
    `;
  }
}
