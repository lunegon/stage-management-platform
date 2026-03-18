import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OffersPage from "./pages/OffersPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import InternshipsPage from "./pages/InternshipsPage";
import CompanyApplicationsPage from "./pages/CompanyApplicationsPage";
import EvaluationsPage from "./pages/EvaluationsPage";
import NavBar from "./components/NavBar";

function App() {
  const [page, setPage] = useState("login");

  return (
    <div className="app-shell">
      <NavBar setPage={setPage} />

      {page === "login" && <LoginPage />}
      {page === "register" && <RegisterPage />}
      {page === "offers" && <OffersPage />}
      {page === "applications" && <ApplicationsPage />}
      {page === "internships" && <InternshipsPage />}
      {page === "company-applications" && <CompanyApplicationsPage />}
      {page === "evaluations" && <EvaluationsPage />}
    </div>
  );
}

export default App;
