import { Link } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { loggedIn, LogOut } = useAuth();
  const navigate = useNavigate();

  function logoutUser() {
    LogOut();
    navigate("/login");
  }

  return (
    <nav>
      <Link to="/">Hem</Link>

      {/* Användar-meny, visas endast när man är inloggad */}
      {loggedIn ? (
        <>
          <Link to="/profile">Profil</Link>
          <Link to="/history">Historik</Link>
          <Link to="/saldo">Saldo</Link>
          {" | "}
          <Link to="/map">Karta</Link> {/* Kart-länken */}
          {" | "}
          <button onClick={logoutUser}>Logga ut</button>
        </>
      ) : (
        <>
          <Link to="/login">Logga in</Link>
          <Link to="/signup">Skapa konto</Link>
        </>
      )}

      {/* Glöm inte att när man loggar in som admin så ska en annan meny synas, kolla kravspec/SDS. 
          Kanske göra en if-sats för att visa rätt meny. */}
    </nav>
  );
}
