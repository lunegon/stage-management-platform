import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

function InternshipsPage() {
  const [internships, setInternships] = useState([]);
  const [message, setMessage] = useState("Chargement des stages...");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const data = await apiFetch("/internships");
        setInternships(data.internships || []);
        setMessage("");
      } catch (error) {
        setMessage(error.message);
      }
    };

    fetchInternships();
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Mes stages</h1>

      {user ? (
        <p>
          Connecté en tant que <strong>{user.nom}</strong> ({user.role})
        </p>
      ) : (
        <p>Aucun utilisateur connecté.</p>
      )}

      {message && <p>{message}</p>}

      {!message && internships.length === 0 && (
        <p>Aucun stage disponible.</p>
      )}

      <div style={{ display: "grid", gap: "20px" }}>
        {internships.map((internship) => (
          <div
            key={internship._id}
            style={{
              border: "1px solid #444",
              borderRadius: "8px",
              padding: "20px",
              background: "#1e1e1e",
              color: "#fff",
            }}
          >
            <p>
              <strong style={{ color: "#aaa" }}>Date début :</strong>{" "}
              {new Date(internship.dateDebut).toLocaleDateString()}
            </p>

            <p>
              <strong style={{ color: "#aaa" }}>Date fin :</strong>{" "}
              {new Date(internship.dateFin).toLocaleDateString()}
            </p>

            <p>
              <strong style={{ color: "#aaa" }}>Statut :</strong>{" "}
              {internship.statut}
            </p>

            {internship.application?.offre && (
              <>
                <h2 style={{ color: "#4da6ff" }}>
                  {internship.application.offre.titre}
                </h2>

                <p>
                  <strong style={{ color: "#aaa" }}>Entreprise :</strong>{" "}
                  {internship.application.offre.entreprise?.nom}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InternshipsPage;
