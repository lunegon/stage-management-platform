import { useState } from "react";
import { apiFetch } from "../services/api";

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
    <div style={{ maxWidth: "400px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Inscription</h1>

      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: "10px" }}>
          <label>Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Rôle</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="etudiant">Étudiant</option>
            <option value="entreprise">Entreprise</option>
            <option value="enseignant">Enseignant</option>
            <option value="administrateur">Administrateur</option>
          </select>
        </div>

        <button type="submit" style={{ padding: "10px 16px" }}>
          Créer un compte
        </button>
      </form>

      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </div>
  );
}

export default RegisterPage;
