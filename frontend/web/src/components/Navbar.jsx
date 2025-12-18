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

    </nav>
  );
}
