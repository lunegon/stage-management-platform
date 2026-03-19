import { useState } from "react";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OffersPage from "./pages/OffersPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import InternshipsPage from "./pages/InternshipsPage";
import CompanyApplicationsPage from "./pages/CompanyApplicationsPage";
import EvaluationsPage from "./pages/EvaluationsPage";
import MyEvaluationsPage from "./pages/MyEvaluationsPage";
import CreateOfferPage from "./pages/CreateOfferPage";
import NavBar from "./components/NavBar";
import { useAuth } from "./context/AuthContext";

function App() {
  const [page, setPage] = useState("home");
  const { isAuthenticated } = useAuth();

  return (
    <div className="app-shell">
      <NavBar setPage={setPage} />

      {page === "home" && <HomePage setPage={setPage} />}
      {page === "dashboard" && <DashboardPage setPage={setPage} />}
      {page === "login" && <LoginPage setPage={setPage} />}
      {page === "register" && <RegisterPage />}
      {page === "offers" && <OffersPage />}
      {page === "applications" && isAuthenticated && <ApplicationsPage />}
      {page === "internships" && isAuthenticated && <InternshipsPage />}
      {page === "company-applications" && isAuthenticated && <CompanyApplicationsPage />}
      {page === "evaluations" && isAuthenticated && <EvaluationsPage />}
      {page === "my-evaluations" && isAuthenticated && <MyEvaluationsPage />}
      {page === "create-offer" && isAuthenticated && <CreateOfferPage />}
    </div>
  );
}

export default App;
