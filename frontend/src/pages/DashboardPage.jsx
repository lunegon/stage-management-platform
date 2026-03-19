import PageContainer from "../components/PageContainer";
import { useAuth } from "../context/AuthContext";

function DashboardPage({ setPage }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <PageContainer title="Dashboard" subtitle="Aucun utilisateur connecté.">
        <div className="card">Veuillez vous connecter.</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Dashboard"
      subtitle={`Bienvenue ${user.nom} (${user.role})`}
    >
      <div className="grid">
        {user.role === "etudiant" && (
          <div className="card">
            <h2 className="card-title">Espace étudiant</h2>
            <p>Consulter les offres, suivre ses candidatures et voir ses stages.</p>

            <div className="btn-row">
              <button className="btn btn-primary" onClick={() => setPage("offers")}>
                Voir les offres
              </button>

              <button
                className="btn btn-success"
                onClick={() => setPage("applications")}
              >
                Mes candidatures
              </button>

              <button
                className="btn btn-primary"
                onClick={() => setPage("internships")}
              >
                Mes stages
              </button>
            </div>
          </div>
        )}

        {user.role === "entreprise" && (
          <div className="card">
            <h2 className="card-title">Espace entreprise</h2>
            <p>
              Consulter les offres, gérer les candidatures reçues et créer les stages.
            </p>

            <div className="btn-row">
              <button className="btn btn-primary" onClick={() => setPage("offers")}>
                Voir les offres
              </button>

              <button
                className="btn btn-success"
                onClick={() => setPage("company-applications")}
              >
                Candidatures reçues
              </button>

              <button
                className="btn btn-primary"
                onClick={() => setPage("internships")}
              >
                Voir les stages
              </button>
            </div>
          </div>
        )}

        {(user.role === "enseignant" || user.role === "administrateur") && (
          <div className="card">
            <h2 className="card-title">Espace enseignant</h2>
            <p>Consulter les stages et gérer les évaluations.</p>

            <div className="btn-row">
              <button
                className="btn btn-primary"
                onClick={() => setPage("internships")}
              >
                Voir les stages
              </button>

              <button
                className="btn btn-success"
                onClick={() => setPage("evaluations")}
              >
                Gérer les évaluations
              </button>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}

export default DashboardPage;
