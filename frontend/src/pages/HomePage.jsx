import PageContainer from "../components/PageContainer";
import { useAuth } from "../context/AuthContext";

function HomePage({ setPage }) {
  const { isAuthenticated, user } = useAuth();

  return (
    <PageContainer
      title="Plateforme de Gestion de Stages"
      subtitle="Application de gestion des offres, candidatures, stages et évaluations."
    >
      <div className="split">
        <div className="card">
          <h2 className="card-title">Présentation</h2>
          <p>
            Cette plateforme permet aux entreprises de publier des offres, aux
            étudiants de candidater, puis de suivre leurs stages et évaluations.
          </p>
          <p>
            Elle repose sur un backend Node.js / Express, MongoDB, Docker et un
            frontend React.
          </p>
        </div>

        <div className="card">
          <h2 className="card-title">Accès rapide</h2>

          {!isAuthenticated && (
            <div className="btn-row">
              <button className="btn btn-primary" onClick={() => setPage("login")}>
                Se connecter
              </button>
              <button className="btn btn-primary" onClick={() => setPage("register")}>
                Créer un compte
              </button>
              <button className="btn btn-success" onClick={() => setPage("offers")}>
                Voir les offres
              </button>
            </div>
          )}

          {isAuthenticated && user && (
            <>
              <p>
                Connecté en tant que <strong>{user.nom}</strong> ({user.role})
              </p>
              <div className="btn-row">
                <button className="btn btn-primary" onClick={() => setPage("dashboard")}>
                  Aller au dashboard
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export default HomePage;
