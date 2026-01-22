import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/UserContext';
import { GoogleLogin } from '@react-oauth/google';

const API_URL = import.meta.env.VITE_API_URL;

// logga in med "vanligt" konto
async function loginBackend(email, password) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Inloggning misslyckades");
  }

  console.log(`${email} är inloggad`);
  return data.token;
}

// logga in med google-konto
async function googleBackend(idToken) {
  const res = await fetch(`${API_URL}/api/auth/oauth`, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({ credential: idToken }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Inloggning misslyckades")
  }

  return data.token
}

export default function Login() {
  const navigate = useNavigate();
  const { LogIn, isAdmin, loggedIn, loadingUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const token = await loginBackend(email, password);
      LogIn(token);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  useEffect(() => {
    if (!loggedIn || loadingUser) return;

    if (isAdmin) {
      navigate("/admin-kunder");
    } else {
      navigate("/profile");
    }
  }, [loggedIn, loadingUser, isAdmin, navigate]);

  return (
    <div>
      <h1>Logga in</h1>

      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          loginUser();
        }}
      >
        <label>E-post:</label>
        <br />

        <input
          type="email"
          placeholder="E-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br />
        <label>Lösenord:</label>
        <br />

        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br /><br />

        <input type="submit" value="Logga in" />
      </form>
        
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <GoogleLogin // Google-knapp
          onSuccess={async credentialResponse => {
            // console.log("Credential:", credentialResponse.credential);
            try {
              const token = await googleBackend(credentialResponse.credential);
              LogIn(token);
            } catch (err) {
              console.error(err);
              alert(err.message);
            }
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div><br></br>
      <br></br>
    </div>
  );
}
