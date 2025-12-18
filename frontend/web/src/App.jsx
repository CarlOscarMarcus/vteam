import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home1";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Profile from "./pages/profile";
import History from "./pages/history";
import Saldo from "./pages/saldo";
import AdminCustomers from "./pages/admin-kunder";

import Layout from "./components/Layout";
import { Authentication } from "./components/Auth";

import MapPage from './pages/Map'; 
import { Logout } from "./pages/Logout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* Huvudsidor */}
        <Route index element={<Home />} />    {/* Home som index */}
        <Route path="home" element={<Home />} />

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* VANLIG */}
        <Route path="profile" element={<Authentication><Profile /></Authentication>} />
        <Route path="history" element={<Authentication><History /></Authentication>} />
        <Route path="saldo" element={<Authentication><Saldo /></Authentication>} />
        <Route path="map" element={<Authentication><MapPage /></Authentication>} /> {/* Kart-sidan */}

        {/* ADMIN */}
        <Route path="admin-kunder" element={<Authentication><AdminCustomers /></Authentication>} />

        
      </Route>
    </Routes>
  );
}
