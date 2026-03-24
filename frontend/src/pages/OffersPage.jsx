import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../services/api";
import PageContainer from "../components/PageContainer";
import { useAuth } from "../context/AuthContext";

function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [message, setMessage] = useState("Chargement des offres...");
  const [actionMessage, setActionMessage] = useState("");
  const [search, setSearch] = useState("");

  const { user } = useAuth();

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

  const filteredOffers = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return offers;

    return offers.filter((offer) => {
      const titre = offer.titre?.toLowerCase() || "";
      const description = offer.description?.toLowerCase() || "";
      const localisation = offer.localisation?.toLowerCase() || "";
      const statut = offer.statut?.toLowerCase() || "";
      const entrepriseNom = offer.entreprise?.nom?.toLowerCase() || "";
      const entrepriseEmail = offer.entreprise?.email?.toLowerCase() || "";

      return (
        titre.includes(keyword) ||
        description.includes(keyword) ||
        localisation.includes(keyword) ||
        statut.includes(keyword) ||
        entrepriseNom.includes(keyword) ||
        entrepriseEmail.includes(keyword)
      );
    });
  }, [offers, search]);

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
    <PageContainer
      title="Liste des offres"
      subtitle={
        user
          ? `Connecté en tant que ${user.nom} (${user.role})`
          : "Consultez les offres disponibles."
      }
    >
      {actionMessage && <div className="message-box">{actionMessage}</div>}
      {message && <div className="message-box">{message}</div>}

      <div className="card" style={{ marginBottom: "20px" }}>
        <div className="form-row" style={{ marginBottom: 0 }}>
          <label>Rechercher une offre</label>
          <input
            className="input"
            type="text"
            placeholder="Ex: Courbevoie, Catalina, support, Paris..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <p style={{ marginTop: "12px", color: "#94a3b8" }}>
          Recherche par mot-clé sur le titre, la description, la ville ou l’entreprise.
        </p>
      </div>

      {!message && filteredOffers.length === 0 && (
        <div className="card">
          {search
            ? "Aucune offre ne correspond à votre recherche."
            : "Aucune offre disponible."}
        </div>
      )}

      <div className="grid">
        {filteredOffers.map((offer) => (
          <div key={offer._id} className="card">
            <h2 className="card-title">{offer.titre}</h2>

            <p>
              <span className="label">Description :</span> {offer.description}
            </p>

            <p>
              <span className="label">Localisation :</span> {offer.localisation}
            </p>

            <p>
              <span className="label">Statut :</span> {offer.statut}
            </p>

            {offer.entreprise && (
              <>
                <p>
                  <span className="label">Entreprise :</span> {offer.entreprise.nom}
                </p>

                <p>
                  <span className="label">Email :</span> {offer.entreprise.email}
                </p>
              </>
            )}

            {user && user.role === "etudiant" && (
              <div className="btn-row">
                <button
                  className="btn btn-primary"
                  onClick={() => handleApply(offer._id)}
                >
                  Postuler
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

export default OffersPage;
