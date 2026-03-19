import { useState } from "react";
import { apiFetch } from "../services/api";
import PageContainer from "../components/PageContainer";

function RegisterPage() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("etudiant");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const data = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ nom, email, password, role }),
      });

      setMessage(`Compte créé avec succès : ${data.user.nom} (${data.user.role})`);
      setNom("");
      setEmail("");
      setPassword("");
      setRole("etudiant");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <PageContainer
      title="Inscription"
      subtitle="Créez un compte selon votre rôle dans la plateforme."
    >
      <div className="card" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <form onSubmit={handleRegister}>
          <div className="form-row">
            <label>Nom</label>
            <input
              className="input"
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Email</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Mot de passe</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Rôle</label>
            <select
              className="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="etudiant">Étudiant</option>
              <option value="entreprise">Entreprise</option>
              <option value="enseignant">Enseignant</option>
              <option value="administrateur">Administrateur</option>
            </select>
          </div>

          <button className="btn btn-primary" type="submit">
            Créer un compte
          </button>
        </form>

        {message && <div className="message-box" style={{ marginTop: "20px" }}>{message}</div>}
      </div>
    </PageContainer>
  );
}

export default RegisterPage;
