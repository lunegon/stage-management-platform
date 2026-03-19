import { useState } from "react";
import { apiFetch } from "../services/api";

function CreateOfferPage() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [statut, setStatut] = useState("ouverte");
  const [message, setMessage] = useState("");

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await apiFetch("/offers", {
        method: "POST",
        body: JSON.stringify({
          titre,
          description,
          localisation,
          statut,
        }),
      });

      setMessage(data.message || "Offre créée avec succès.");
      setTitre("");
      setDescription("");
      setLocalisation("");
      setStatut("ouverte");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Créer une offre</h1>

      {user ? (
        <p>
          Connecté en tant que <strong>{user.nom}</strong> ({user.role})
        </p>
      ) : (
        <p>Aucun utilisateur connecté.</p>
      )}

      {message && (
        <p
          style={{
            marginBottom: "20px",
            padding: "10px",
            background: "#2d2d2d",
            border: "1px solid #555",
            borderRadius: "6px",
          }}
        >
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid #444",
          borderRadius: "8px",
          padding: "20px",
          background: "#1e1e1e",
          color: "#fff",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label>Titre</label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px", minHeight: "120px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Localisation</label>
          <input
            type="text"
            value={localisation}
            onChange={(e) => setLocalisation(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Statut</label>
          <select
            value={statut}
            onChange={(e) => setStatut(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          >
            <option value="ouverte">ouverte</option>
            <option value="fermee">fermee</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "10px 16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            background: "#4da6ff",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Créer l’offre
        </button>
      </form>
    </div>
  );
}

export default CreateOfferPage;
