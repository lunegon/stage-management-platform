import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import PageContainer from "../components/PageContainer";

function AdminPage() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [offers, setOffers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [internships, setInternships] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [message, setMessage] = useState("Chargement des données admin...");

  const fetchAdminData = async () => {
    try {
      const [statsData, usersData, offersData, applicationsData, internshipsData, evaluationsData] =
        await Promise.all([
          apiFetch("/admin/stats"),
          apiFetch("/admin/users"),
          apiFetch("/admin/offers"),
          apiFetch("/admin/applications"),
          apiFetch("/admin/internships"),
          apiFetch("/admin/evaluations"),
        ]);

      setStats(statsData.stats || null);
      setUsers(usersData.users || []);
      setOffers(offersData.offers || []);
      setApplications(applicationsData.applications || []);
      setInternships(internshipsData.internships || []);
      setEvaluations(evaluationsData.evaluations || []);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleDelete = async (endpoint, successMessage) => {
    try {
      const data = await apiFetch(endpoint, { method: "DELETE" });
      setMessage(data.message || successMessage);
      await fetchAdminData();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleReset = async () => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment réinitialiser toute la base de données ?"
    );

    if (!confirmed) return;

    try {
      const data = await apiFetch("/admin/reset", { method: "DELETE" });
      setMessage(data.message || "Base réinitialisée avec succès.");
      await fetchAdminData();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <PageContainer
      title="Administration"
      subtitle="Gestion globale de la plateforme pour la démonstration et la supervision."
    >
      {message && <div className="message-box">{message}</div>}

      {stats && (
        <div className="grid" style={{ marginBottom: "30px" }}>
          <div className="card"><h3 className="card-title">Utilisateurs</h3><p>{stats.users}</p></div>
          <div className="card"><h3 className="card-title">Offres</h3><p>{stats.offers}</p></div>
          <div className="card"><h3 className="card-title">Candidatures</h3><p>{stats.applications}</p></div>
          <div className="card"><h3 className="card-title">Stages</h3><p>{stats.internships}</p></div>
          <div className="card"><h3 className="card-title">Évaluations</h3><p>{stats.evaluations}</p></div>
        </div>
      )}

      <div className="card" style={{ marginBottom: "30px" }}>
        <h2 className="card-title">Actions sensibles</h2>
        <p>Cette section permet de remettre la base à zéro pour la soutenance.</p>
        <button className="btn btn-danger" onClick={handleReset}>
          Reset base de données
        </button>
      </div>

      <div className="split">
        <section>
          <h2 className="card-title">Utilisateurs</h2>
          <div className="grid">
            {users.map((user) => (
              <div key={user._id} className="card">
                <p><span className="label">Nom :</span> {user.nom}</p>
                <p><span className="label">Email :</span> {user.email}</p>
                <p><span className="label">Rôle :</span> {user.role}</p>
                {user.role !== "administrateur" && (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(`/admin/users/${user._id}`, "Utilisateur supprimé.")}
                  >
                    Supprimer
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="card-title">Offres</h2>
          <div className="grid">
            {offers.map((offer) => (
              <div key={offer._id} className="card">
                <p><span className="label">Titre :</span> {offer.titre}</p>
                <p><span className="label">Localisation :</span> {offer.localisation}</p>
                <p><span className="label">Statut :</span> {offer.statut}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(`/admin/offers/${offer._id}`, "Offre supprimée.")}
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="split" style={{ marginTop: "30px" }}>
        <section>
          <h2 className="card-title">Candidatures</h2>
          <div className="grid">
            {applications.map((application) => (
              <div key={application._id} className="card">
                <p><span className="label">Étudiant :</span> {application.etudiant?.nom}</p>
                <p><span className="label">Offre :</span> {application.offre?.titre}</p>
                <p><span className="label">Statut :</span> {application.statut}</p>
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    handleDelete(`/admin/applications/${application._id}`, "Candidature supprimée.")
                  }
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="card-title">Stages</h2>
          <div className="grid">
            {internships.map((internship) => (
              <div key={internship._id} className="card">
                <p><span className="label">Étudiant :</span> {internship.etudiant?.nom}</p>
                <p><span className="label">Entreprise :</span> {internship.entreprise?.nom}</p>
                <p><span className="label">Statut :</span> {internship.statut}</p>
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    handleDelete(`/admin/internships/${internship._id}`, "Stage supprimé.")
                  }
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section style={{ marginTop: "30px" }}>
        <h2 className="card-title">Évaluations</h2>
        <div className="grid">
          {evaluations.map((evaluation) => (
            <div key={evaluation._id} className="card">
              <p><span className="label">Note :</span> {evaluation.note}/20</p>
              <p><span className="label">Commentaire :</span> {evaluation.commentaire || "Aucun commentaire"}</p>
              <p><span className="label">Enseignant :</span> {evaluation.enseignant?.nom}</p>
              <button
                className="btn btn-danger"
                onClick={() =>
                  handleDelete(`/admin/evaluations/${evaluation._id}`, "Évaluation supprimée.")
                }
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

export default AdminPage;
