import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Hem</Link>
      {" | "}
      <Link to="/login">Logga in</Link>
      {" | "}
      <Link to="/signup">Skapa konto</Link>
      {" | "}
      {/* Användar-meny, dessa ska sen enbart synas när man är inloggad.
      Men kan vara här sålänge för test. */}
      <Link to="/profile">Profil</Link>
      {" | "}
      <Link to="/history">Historik</Link>
      {" | "}
      <Link to="/saldo">Saldo</Link>
      {" | "}
      <Link to="/signout">Logga ut</Link>

    {/* Glöm inte att när man logga in som admin så ska en annan meny synas, kolla kravspec/SDS. 
    Kanske göra en if-sats för att visa rätt meny. */}
    </nav>
  );
}
