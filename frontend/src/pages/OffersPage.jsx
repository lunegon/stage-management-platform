import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [message, setMessage] = useState("Chargement des offres...");

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

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Liste des offres</h1>

      {message && <p>{message}</p>}

      {!message && offers.length === 0 && <p>Aucune offre disponible.</p>}

      <div style={{ display: "grid", gap: "20px" }}>
        {offers.map((offer) => (
          <div
            key={offer._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "20px",
              background: "#1e1e1e",
	      color: "#fff",
            }}
          >
            <h2 style={{ marginBottom: "10px", color: "#4da6ff" }}>{offer.titre}</h2>
            <p><strong style={{ color: "#aaa"}}>Description :</strong> {offer.description}</p>
            <p><strong style={{ color: "#aaa" }}>Localisation :</strong> {offer.localisation}</p>
            <p><strong style={{ color: "#aaa" }}>Statut :</strong> {offer.statut}</p>

            {offer.entreprise && (
              <>
                <p><strong style={{ color: "#aaa" }}>Entreprise :</strong> {offer.entreprise.nom}</p>
                <p><strong style={{ color: "#aaa" }}>Email :</strong> {offer.entreprise.email}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OffersPage;
