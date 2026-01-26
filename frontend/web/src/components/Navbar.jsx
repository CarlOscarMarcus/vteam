import { Link } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  const { loggedIn, LogOut, isAdmin, loadingUser } = useAuth();
  const navigate = useNavigate();


  function logoutUser() {
    LogOut();
    navigate("/login");
  }

  return (
    <nav>
      <Link to="/">Hem</Link>

      {loggedIn && !loadingUser ? (
        <>
        {isAdmin ? (
          <> 
          {/* ADMIN */}
          <Link to="/admin-kunder">Kundöversikt</Link>
          <Link to="/admin-cyklar">Cykelöversikt</Link>
          <Link to="/admin-parkering">Parkeringsöversikt</Link>
          <Link to="/admin-laddare">Laddare</Link>
          <Link to="/map">Karta</Link> {/* Kart-länken */}



          </>
        ) : (
          <>
          {/* VANLIG */}
          <Link to="/profile">Profil</Link>
          <Link to="/history">Historik</Link>
          <Link to="/balance">Saldo</Link>
          <Link to="/receipt">Kvitton</Link>
          <Link to="/map">Karta</Link> {/* Kart-länken */}
          </>
        )}
          <button onClick={logoutUser}>Logga ut</button>
        </>
      ) : (
        <>
          <Link to="/login">Logga in</Link>
          <Link to="/signup">Skapa konto</Link>
        </>
      )}

    </nav>
  );
}
