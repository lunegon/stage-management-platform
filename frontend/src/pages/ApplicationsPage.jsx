import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("Chargement des candidatures...");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await apiFetch("/applications");
        setApplications(data.applications || []);
        setMessage("");
      } catch (error) {
        setMessage(error.message);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Mes candidatures</h1>

      {user ? (
        <p>
          Connecté en tant que <strong>{user.nom}</strong> ({user.role})
        </p>
      ) : (
        <p>Aucun utilisateur connecté.</p>
      )}

      {message && <p>{message}</p>}

      {!message && applications.length === 0 && (
        <p>Aucune candidature disponible.</p>
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

            <p>
              <strong style={{ color: "#aaa" }}>Statut candidature :</strong>{" "}
              {application.statut}
            </p>

            <p>
              <strong style={{ color: "#aaa" }}>Message :</strong>{" "}
              {application.message || "Aucun message"}
            </p>

            {application.offre?.entreprise && (
              <>
                <p>
                  <strong style={{ color: "#aaa" }}>Entreprise :</strong>{" "}
                  {application.offre.entreprise.nom}
                </p>
                <p>
                  <strong style={{ color: "#aaa" }}>Email entreprise :</strong>{" "}
                  {application.offre.entreprise.email}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplicationsPage;
