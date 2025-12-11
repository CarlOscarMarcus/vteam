import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home1";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Profile from "./pages/profile";
import History from "./pages/history";
import Saldo from "./pages/saldo";
import Layout from "./components/Layout";

import MapPage from './pages/Map'; 

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* Huvudsidor */}
        <Route index element={<Home />} />    {/* Home som index */}
        <Route path="home" element={<Home />} />

        <Route path="map" element={<MapPage />} /> {/* Kart-sidan */}

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="profile" element={<Profile />} />
        <Route path="history" element={<History />} />
        <Route path="saldo" element={<Saldo />} />
        
      </Route>
    </Routes>
  );
}
