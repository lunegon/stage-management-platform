import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import PageContainer from "../components/PageContainer";

function EvaluationsPage() {
  const [internships, setInternships] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [message, setMessage] = useState("Chargement des données...");
  const [actionMessage, setActionMessage] = useState("");
  const [formData, setFormData] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchData = async () => {
    try {
      const [internshipsData, evaluationsData] = await Promise.all([
        apiFetch("/internships"),
        apiFetch("/evaluations"),
      ]);

      setInternships(internshipsData.internships || []);
      setEvaluations(evaluationsData.evaluations || []);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (internshipId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [internshipId]: {
        ...prev[internshipId],
        [field]: value,
      },
    }));
  };

  const createEvaluation = async (internshipId) => {
    try {
      const current = formData[internshipId] || {};
      const { note, commentaire } = current;

      if (note === undefined || note === "") {
        setActionMessage("Veuillez renseigner une note.");
        return;
      }

      const data = await apiFetch("/evaluations", {
        method: "POST",
        body: JSON.stringify({
          internshipId,
          note: Number(note),
          commentaire: commentaire || "",
        }),
      });

      setActionMessage(data.message || "Évaluation créée avec succès.");
      await fetchData();
    } catch (error) {
      setActionMessage(error.message);
    }
  };

  const findEvaluationForInternship = (internshipId) => {
    return evaluations.find((evaluation) => {
      const linkedInternshipId =
        typeof evaluation.internship === "string"
          ? evaluation.internship
          : evaluation.internship?._id;

      return linkedInternshipId === internshipId;
    });
  };

  return (
    <PageContainer
      title="Évaluations"
      subtitle={
        user
          ? `Connecté en tant que ${user.nom} (${user.role})`
          : "Aucun utilisateur connecté."
      }
    >
      {actionMessage && <div className="message-box">{actionMessage}</div>}
      {message && <div className="message-box">{message}</div>}

      <div className="split">
        <section>
          <h2 className="card-title">Créer une évaluation</h2>

          <div className="grid">
            {internships.map((internship) => {
              const existingEvaluation = findEvaluationForInternship(internship._id);

              return (
                <div key={internship._id} className="card">
                  <p>
                    <span className="label">Date début :</span>{" "}
                    {new Date(internship.dateDebut).toLocaleDateString()}
                  </p>

                  <p>
                    <span className="label">Date fin :</span>{" "}
                    {new Date(internship.dateFin).toLocaleDateString()}
                  </p>

                  <p>
                    <span className="label">Statut :</span> {internship.statut}
                  </p>

                  {internship.offre && (
                    <>
                      <h3 className="card-title">{internship.offre.titre}</h3>
                      <p>
                        <span className="label">Localisation :</span>{" "}
                        {internship.offre.localisation}
                      </p>
                    </>
                  )}

                  {internship.etudiant && (
                    <p>
                      <span className="label">Étudiant :</span>{" "}
                      {internship.etudiant.nom}
                    </p>
                  )}

                  {internship.entreprise && (
                    <p>
                      <span className="label">Entreprise :</span>{" "}
                      {internship.entreprise.nom}
                    </p>
                  )}

                  {existingEvaluation ? (
                    <div className="form-block">
                      <p>
                        <span className="label">Évaluation existante :</span>
                      </p>
                      <p>
                        <span className="label">Note :</span> {existingEvaluation.note}/20
                      </p>
                      <p>
                        <span className="label">Commentaire :</span>{" "}
                        {existingEvaluation.commentaire || "Aucun commentaire"}
                      </p>
                    </div>
                  ) : (
                    <div className="form-block">
                      <div className="form-row">
                        <label>Note / 20</label>
                        <input
                          className="input"
                          type="number"
                          min="0"
                          max="20"
                          value={formData[internship._id]?.note || ""}
                          onChange={(e) =>
                            handleChange(internship._id, "note", e.target.value)
                          }
                        />
                      </div>

                      <div className="form-row">
                        <label>Commentaire</label>
                        <textarea
                          className="textarea"
                          value={formData[internship._id]?.commentaire || ""}
                          onChange={(e) =>
                            handleChange(internship._id, "commentaire", e.target.value)
                          }
                        />
                      </div>

                      <button
                        className="btn btn-primary"
                        onClick={() => createEvaluation(internship._id)}
                      >
                        Enregistrer l’évaluation
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="card-title">Évaluations existantes</h2>

          <div className="grid">
            {evaluations.length === 0 && (
              <div className="card">Aucune évaluation disponible.</div>
            )}

            {evaluations.map((evaluation) => (
              <div key={evaluation._id} className="card">
                <h3 className="card-title">
                  {evaluation.internship?.offre?.titre || "Stage"}
                </h3>

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

                {evaluation.internship?.etudiant && (
                  <p>
                    <span className="label">Étudiant :</span>{" "}
                    {evaluation.internship.etudiant.nom}
                  </p>
                )}

                {evaluation.internship?.entreprise && (
                  <p>
                    <span className="label">Entreprise :</span>{" "}
                    {evaluation.internship.entreprise.nom}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

export default EvaluationsPage;
