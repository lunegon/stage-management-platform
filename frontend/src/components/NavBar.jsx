import { useAuth } from "../context/AuthContext";

function NavBar({ setPage }) {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setPage("home");
  };

  return (
    <nav className="topbar">
      <button onClick={() => setPage("home")}>Accueil</button>

      {!isAuthenticated && (
        <>
          <button onClick={() => setPage("login")}>Connexion</button>
          <button onClick={() => setPage("register")}>Inscription</button>
          <button onClick={() => setPage("offers")}>Offres</button>
        </>
      )}

      {isAuthenticated && user?.role === "etudiant" && (
        <>
          <button onClick={() => setPage("dashboard")}>Dashboard</button>
          <button onClick={() => setPage("offers")}>Offres</button>
          <button onClick={() => setPage("applications")}>Mes candidatures</button>
          <button onClick={() => setPage("internships")}>Mes stages</button>
          <button onClick={() => setPage("my-evaluations")}>Mes évaluations</button>
          <button onClick={handleLogout}>Déconnexion</button>
        </>
      )}

      {isAuthenticated && user?.role === "entreprise" && (
        <>
          <button onClick={() => setPage("dashboard")}>Dashboard</button>
          <button onClick={() => setPage("offers")}>Offres</button>
          <button onClick={() => setPage("create-offer")}>Créer une offre</button>
          <button onClick={() => setPage("company-applications")}>
            Candidatures reçues
          </button>
          <button onClick={() => setPage("internships")}>Stages</button>
          <button onClick={handleLogout}>Déconnexion</button>
        </>
      )}

      {isAuthenticated &&
        (user?.role === "enseignant" || user?.role === "administrateur") && (
          <>
            <button onClick={() => setPage("dashboard")}>Dashboard</button>
            <button onClick={() => setPage("internships")}>Stages</button>
            <button onClick={() => setPage("evaluations")}>Évaluations</button>
            <button onClick={handleLogout}>Déconnexion</button>
          </>
        )}
    </nav>
  );
}

export default NavBar;
