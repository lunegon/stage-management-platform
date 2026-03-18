import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

function CompanyApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("Chargement des candidatures...");
  const [actionMessage, setActionMessage] = useState("");
  const [dates, setDates] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchApplications = async () => {
    try {
      const data = await apiFetch("/applications");
      setApplications(data.applications || []);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (applicationId, status) => {
    try {
      const data = await apiFetch(`/applications/${applicationId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      setActionMessage(data.message || "Statut mis à jour avec succès.");
      fetchApplications();
    } catch (error) {
      setActionMessage(error.message);
    }
  };

  const handleDateChange = (applicationId, field, value) => {
    setDates((prev) => ({
      ...prev,
      [applicationId]: {
        ...prev[applicationId],
        [field]: value,
      },
    }));
  };

  const createInternship = async (applicationId) => {
    try {
      const applicationDates = dates[applicationId] || {};
      const { dateDebut, dateFin } = applicationDates;

      if (!dateDebut || !dateFin) {
        setActionMessage("Veuillez renseigner la date de début et la date de fin.");
        return;
      }

      const data = await apiFetch("/internships", {
        method: "POST",
        body: JSON.stringify({
          applicationId,
          dateDebut,
          dateFin,
        }),
      });

      setActionMessage(data.message || "Stage créé avec succès.");
    } catch (error) {
      setActionMessage(error.message);
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Candidatures reçues</h1>

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

      {!message && applications.length === 0 && (
        <p>Aucune candidature reçue.</p>
      )}

      <div style={{ display: "grid", gap: "20px" }}>
        {applications.map((application) => (
          <div
            key={application._id}
            style={{
              border: "1px solid #444",
              borderRadius: "8px",
              padding: "20px",
              background: "#1e1e1e",
              color: "#fff",
            }}
          >
            {application.offre && (
              <>
                <h2 style={{ marginBottom: "10px", color: "#4da6ff" }}>
                  {application.offre.titre}
                </h2>

                <p>
                  <strong style={{ color: "#aaa" }}>Description :</strong>{" "}
                  {application.offre.description}
                </p>

                <p>
                  <strong style={{ color: "#aaa" }}>Localisation :</strong>{" "}
                  {application.offre.localisation}
                </p>
              </>
            )}

            {application.etudiant && (
              <>
                <p>
                  <strong style={{ color: "#aaa" }}>Étudiant :</strong>{" "}
                  {application.etudiant.nom}
                </p>

                <p>
                  <strong style={{ color: "#aaa" }}>Email :</strong>{" "}
                  {application.etudiant.email}
                </p>
              </>
            )}

            <p>
              <strong style={{ color: "#aaa" }}>Statut :</strong>{" "}
              {application.statut}
            </p>

            <p>
              <strong style={{ color: "#aaa" }}>Message :</strong>{" "}
              {application.message || "Aucun message"}
            </p>

            {application.statut === "en_attente" && (
              <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                <button
                  onClick={() => updateStatus(application._id, "acceptee")}
                  style={{
                    padding: "10px 16px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    background: "#2e8b57",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Accepter
                </button>

                <button
                  onClick={() => updateStatus(application._id, "refusee")}
                  style={{
                    padding: "10px 16px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    background: "#b22222",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Refuser
                </button>
              </div>
            )}

            {application.statut === "acceptee" && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "15px",
                  border: "1px solid #555",
                  borderRadius: "8px",
                  background: "#2a2a2a",
                }}
              >
                <h3 style={{ marginBottom: "15px", color: "#4da6ff" }}>
                  Créer le stage
                </h3>

                <div style={{ marginBottom: "10px" }}>
                  <label>Date début</label>
                  <input
                    type="date"
                    value={dates[application._id]?.dateDebut || ""}
                    onChange={(e) =>
                      handleDateChange(application._id, "dateDebut", e.target.value)
                    }
                    style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                  />
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <label>Date fin</label>
                  <input
                    type="date"
                    value={dates[application._id]?.dateFin || ""}
                    onChange={(e) =>
                      handleDateChange(application._id, "dateFin", e.target.value)
                    }
                    style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                  />
                </div>

                <button
                  onClick={() => createInternship(application._id)}
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
                  Créer le stage
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompanyApplicationsPage;
