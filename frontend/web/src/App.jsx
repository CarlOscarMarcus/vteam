import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Profile from "./pages/profile";
import History from "./pages/history";
import Saldo from "./pages/saldo";
import Layout from "./components/Layout";

import Index from './pages/Index';
import About from './pages/About';
import MapPage from './pages/Map'; 

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Feature/maps sidor */}
        <Route index element={<Index />} />
        <Route path="about" element={<About />} />
        <Route path="map" element={<MapPage />} />

        {/* Tidigare main sidor */}
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="profile" element={<Profile />} />
        <Route path="history" element={<History />} />
        <Route path="saldo" element={<Saldo />} />
      </Route>
    </Routes>
  );
}
