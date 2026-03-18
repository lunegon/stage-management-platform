function NavBar({ setPage }) {
  return (
    <nav className="topbar">
      <button onClick={() => setPage("login")}>Connexion</button>
      <button onClick={() => setPage("register")}>Inscription</button>
      <button onClick={() => setPage("offers")}>Offres</button>
      <button onClick={() => setPage("applications")}>Mes candidatures</button>
      <button onClick={() => setPage("internships")}>Mes stages</button>
      <button onClick={() => setPage("company-applications")}>Candidatures reçues</button>
      <button onClick={() => setPage("evaluations")}>Évaluations</button>
    </nav>
  );
}

export default NavBar;
