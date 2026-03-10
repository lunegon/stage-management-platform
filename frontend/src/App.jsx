import { useState } from "react";

function App() {
  const [message, setMessage] = useState("Pas encore testé");

  const testApi = async () => {
    try {
      const response = await fetch("/api/health");
      const data = await response.json();
      setMessage(data.status);
    } catch (error) {
      setMessage("Erreur de connexion au backend");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>Plateforme de Gestion de Stages</h1>
      <p>Frontend React de test</p>

      <button onClick={testApi} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Tester API
      </button>

      <p style={{ marginTop: "20px", fontSize: "18px" }}>
        Réponse API : <strong>{message}</strong>
      </p>
    </div>
  );
}

export default App;
