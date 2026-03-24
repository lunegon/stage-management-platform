import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import PageContainer from "../components/PageContainer";
import { useAuth } from "../context/AuthContext";

function MyEvaluationsPage() {
  const { user } = useAuth();
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchEvaluations = async () => {
      if (!user?.id) {
        setEvaluations([]);
        setErrorMessage("Aucun utilisateur connecté.");
        setLoading(false);
        return;
      }

      try {
        const data = await apiFetch("/evaluations");
        const allEvaluations = data.evaluations || [];

        const filteredEvaluations = allEvaluations.filter((evaluation) => {
          const etudiantId = evaluation?.internship?.etudiant?._id;
          return etudiantId && etudiantId.toString() === user.id.toString();
        });

        setEvaluations(filteredEvaluations);
        setErrorMessage("");
      } catch (error) {
        setEvaluations([]);
        setErrorMessage(error.message || "Erreur lors du chargement des évaluations.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluations();
  }, [user]);

  return (
    <PageContainer
      title="Mes évaluations"
      subtitle={
        user
          ? `Connecté en tant que ${user.nom} (${user.role})`
          : "Aucun utilisateur connecté."
      }
    >
      {loading && <div className="message-box">Chargement des évaluations...</div>}

      {!loading && errorMessage && (
        <div className="message-box">{errorMessage}</div>
      )}

      {!loading && !errorMessage && evaluations.length === 0 && (
        <div className="card">Aucune évaluation disponible.</div>
      )}

      {!loading && !errorMessage && evaluations.length > 0 && (
        <div className="grid">
          {evaluations.map((evaluation) => (
            <div key={evaluation._id} className="card">
              <h2 className="card-title">
                {evaluation.internship?.offre?.titre || "Stage"}
              </h2>

              <p>
                <span className="label">Note :</span> {evaluation.note}/20
              </p>

              <p>
                <span className="label">Commentaire :</span>{" "}
                {evaluation.commentaire || "Aucun commentaire"}
              </p>

              {evaluation.enseignant && (
                <p>
                  <span className="label">Enseignant :</span>{" "}
                  {evaluation.enseignant.nom}
                </p>
              )}

              {evaluation.internship?.entreprise && (
                <p>
                  <span className="label">Entreprise :</span>{" "}
                  {evaluation.internship.entreprise.nom}
                </p>
              )}

              {evaluation.internship?.dateDebut && (
                <p>
                  <span className="label">Date début :</span>{" "}
                  {new Date(evaluation.internship.dateDebut).toLocaleDateString()}
                </p>
              )}

              {evaluation.internship?.dateFin && (
                <p>
                  <span className="label">Date fin :</span>{" "}
                  {new Date(evaluation.internship.dateFin).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}

export default MyEvaluationsPage;
