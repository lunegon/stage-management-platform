import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [message, setMessage] = useState("Chargement des offres...");
  const [actionMessage, setActionMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await apiFetch("/offers");
        setOffers(data.offers || []);
        setMessage("");
      } catch (error) {
        setMessage(error.message);
      }
    };

    fetchOffers();
  }, []);

  const handleApply = async (offerId) => {
    try {
      const data = await apiFetch("/applications", {
        method: "POST",
        body: JSON.stringify({
          offreId: offerId,
          message: "Candidature envoyée depuis le frontend.",
        }),
      });

      setActionMessage(data.message || "Candidature envoyée avec succès.");
    } catch (error) {
      setActionMessage(error.message);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Liste des offres</h1>

      {user ? (
        <p>
          Connecté en tant que <strong>{user.nom}</strong> ({user.role})
        </p>
      ) : (
        <p>Aucun utilisateur connecté.</p>
      )}

      {actionMessage && (
        <p
          style={{
            marginBottom: "20px",
            padding: "10px",
            background: "#2d2d2d",
            border: "1px solid #555",
            borderRadius: "6px",
          }}
        >
          {actionMessage}
        </p>
      )}

      {message && <p>{message}</p>}

      {!message && offers.length === 0 && <p>Aucune offre disponible.</p>}

      <div style={{ display: "grid", gap: "20px" }}>
        {offers.map((offer) => (
          <div
            key={offer._id}
            style={{
              border: "1px solid #444",
              borderRadius: "8px",
              padding: "20px",
              background: "#1e1e1e",
              color: "#fff",
            }}
          >
            <h2 style={{ marginBottom: "10px", color: "#4da6ff" }}>
              {offer.titre}
            </h2>

            <p>
              <strong style={{ color: "#aaa" }}>Description :</strong>{" "}
              {offer.description}
            </p>
            <p>
              <strong style={{ color: "#aaa" }}>Localisation :</strong>{" "}
              {offer.localisation}
            </p>
            <p>
              <strong style={{ color: "#aaa" }}>Statut :</strong> {offer.statut}
            </p>

            {offer.entreprise && (
              <>
                <p>
                  <strong style={{ color: "#aaa" }}>Entreprise :</strong>{" "}
                  {offer.entreprise.nom}
                </p>
                <p>
                  <strong style={{ color: "#aaa" }}>Email :</strong>{" "}
                  {offer.entreprise.email}
                </p>
              </>
            )}

            {user && user.role === "etudiant" && (
              <button
                onClick={() => handleApply(offer._id)}
                style={{
                  marginTop: "15px",
                  padding: "10px 16px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  background: "#4da6ff",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Postuler
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OffersPage;
