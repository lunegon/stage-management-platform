import { useState } from "react";
import { apiFetch } from "../services/api";
import { useAuth } from "../context/AuthContext";
import PageContainer from "../components/PageContainer";

function LoginPage({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      login(data.user, data.token);
      setMessage(`Connexion réussie : ${data.user.nom} (${data.user.role})`);
      setPage("dashboard");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <PageContainer title="Connexion" subtitle="Connectez-vous à votre espace.">
      <div className="card" style={{ maxWidth: "450px", margin: "0 auto" }}>
        <form onSubmit={handleLogin}>
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

          <button className="btn btn-primary" type="submit">
            Se connecter
          </button>
        </form>

        {message && <div className="message-box" style={{ marginTop: "20px" }}>{message}</div>}
      </div>
    </PageContainer>
  );
}

export default LoginPage;
