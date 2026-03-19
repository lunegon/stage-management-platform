import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

function MyEvaluationsPage() {
  const [evaluations, setEvaluations] = useState([]);
  const [message, setMessage] = useState("Chargement des évaluations...");

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const data = await apiFetch("/evaluations");
        const allEvaluations = data.evaluations || [];

        const filtered = allEvaluations.filter((evaluation) => {
          return evaluation.internship?.etudiant?._id === user?._id;
        });

        setEvaluations(filtered);
        setMessage("");
      } catch (error) {
        setMessage(error.message);
      }
    };

    fetchEvaluations();
  }, [user?._id]);

  return (
    <div style={{ maxWidth: "1000px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Mes évaluations</h1>

      {user ? (
        <p>
          Connecté en tant que <strong>{user.nom}</strong> ({user.role})
        </p>
      ) : (
        <p>Aucun utilisateur connecté.</p>
      )}

      {message && <p>{message}</p>}
      {!message && evaluations.length === 0 && <p>Aucune évaluation disponible.</p>}

      <div style={{ display: "grid", gap: "20px" }}>
        {evaluations.map((evaluation) => (
          <div
            key={evaluation._id}
            style={{
              border: "1px solid #444",
              borderRadius: "8px",
              padding: "20px",
              background: "#1e1e1e",
              color: "#fff",
            }}
          >
            <h2 style={{ marginBottom: "10px", color: "#4da6ff" }}>
              {evaluation.internship?.offre?.titre || "Stage"}
            </h2>

            <p>
              <strong style={{ color: "#aaa" }}>Note :</strong> {evaluation.note}/20
            </p>

            <p>
              <strong style={{ color: "#aaa" }}>Commentaire :</strong>{" "}
              {evaluation.commentaire || "Aucun commentaire"}
            </p>

            {evaluation.enseignant && (
              <p>
                <strong style={{ color: "#aaa" }}>Enseignant :</strong>{" "}
                {evaluation.enseignant.nom}
              </p>
            )}

            {evaluation.internship?.entreprise && (
              <p>
                <strong style={{ color: "#aaa" }}>Entreprise :</strong>{" "}
                {evaluation.internship.entreprise.nom}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyEvaluationsPage;
