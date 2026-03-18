import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OffersPage from "./pages/OffersPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import InternshipsPage from "./pages/InternshipsPage";
import CompanyApplicationsPage from "./pages/CompanyApplicationsPage";

function App() {
  const [page, setPage] = useState("login");

  return (
    <div>
      <nav
        style={{
          display: "flex",
          gap: "10px",
          padding: "20px",
          justifyContent: "center",
          borderBottom: "1px solid #ccc",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <button onClick={() => setPage("login")} style={{ padding: "10px 16px" }}>
          Connexion
        </button>

        <button onClick={() => setPage("register")} style={{ padding: "10px 16px" }}>
          Inscription
        </button>

        <button onClick={() => setPage("offers")} style={{ padding: "10px 16px" }}>
          Offres
        </button>

        <button onClick={() => setPage("applications")} style={{ padding: "10px 16px" }}>
          Mes candidatures
        </button>

        <button onClick={() => setPage("internships")} style={{ padding: "10px 16px" }}>
          Mes stages
        </button>

        <button onClick={() => setPage("company-applications")} style={{ padding: "10px 16px" }}>
          Candidatures reçues
        </button>
      </nav>

      {page === "login" && <LoginPage />}
      {page === "register" && <RegisterPage />}
      {page === "offers" && <OffersPage />}
      {page === "applications" && <ApplicationsPage />}
      {page === "internships" && <InternshipsPage />}
      {page === "company-applications" && <CompanyApplicationsPage />}
    </div>
  );
}

export default App;
