import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("Chargement des candidatures...");

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

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

  const getStatusStyle = (status) => {
    if (status === "acceptee") {
      return {
        background: "#14532d",
        color: "#86efac",
        border: "1px solid #166534",
      };
    }

    if (status === "refusee") {
      return {
        background: "#7f1d1d",
        color: "#fca5a5",
        border: "1px solid #991b1b",
      };
    }

    return {
      background: "#78350f",
      color: "#fcd34d",
      border: "1px solid #92400e",
    };
  };

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
              <span
                style={{
                  ...getStatusStyle(application.statut),
                  padding: "4px 10px",
                  borderRadius: "999px",
                  fontWeight: "bold",
                  display: "inline-block",
                }}
              >
                {application.statut}
              </span>
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
