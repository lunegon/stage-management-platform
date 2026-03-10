import { useState } from "react";

function App() {
  const [message, setMessage] = useState("Pas encore testé");

  const testApi = async () => {
    try {
      const response = await fetch("http://79.137.35.83:5000/api/health");
      const data = await response.json();
      setMessage(data.status);
    } catch (error) {
      setMessage("Erreur de connexion au backend");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "40px" }}>
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
