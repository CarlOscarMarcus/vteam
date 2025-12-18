import { Link } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// min dator, hemma
// const backendURL = "192.168.32.7"

// min dator, hos mamma och pappa
const backendURL = "192.168.1.103"

export default function Navbar() {
  const { loggedIn, LogOut, isAdmin, loadingUser } = useAuth();
  const navigate = useNavigate();
  // const [user, setUser] = useState(null)
  // const [loading, setLoading] = useState(true)
    

    // useEffect (() => {
    //   if (!token) return
    //     async function getUser () {
    //       try{
    //             const res = await fetch(`http://${backendURL}:3000/api/auth/me`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${token}`
    //                 },
    //             })

    //             if (!res.ok) throw new Error('Kunde inte hämta användaren.')
    //             const data = await res.json()
    //             console.log(data)
    //             setUser(data)
    //             } catch (err) {
    //               console.error(err)
    //             } finally {
    //               setLoading(false)
    //             }
    //     }
    //     getUser()
    // }, [token])


  function logoutUser() {
    LogOut();
    navigate("/login");
  }

  return (
    <nav>
      <Link to="/">Hem</Link>

      {/* Användar-meny, visas endast när man är inloggad */}
      {loggedIn && !loadingUser ? (
        <>
        {isAdmin ? (
          <> 
          {/* ADMIN */}
          <Link to="/admin-kunder">Kundöversikt</Link>
          </>
        ) : (
          <>
          {/* VANLIG */}
          <Link to="/profile">Profil</Link>
          <Link to="/history">Historik</Link>
          <Link to="/saldo">Saldo</Link>
          {" | "}
          <Link to="/map">Karta</Link> {/* Kart-länken */}
          </>
        )}
        

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
