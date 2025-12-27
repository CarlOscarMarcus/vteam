import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home1";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Profile from "./pages/profile";
import History from "./pages/history";
import Balance from "./pages/balance";
import Receipts from "./pages/receipt";

//ADMIN
import AdminBikes from "./pages/admin-cyklar";
import AdminChargers from "./pages/admin-laddare";
import AdminParkings from "./pages/admin-parkering";
import AdminCustomers from "./pages/admin-kunder";
import AdminRoute from "./components/Admin";
import AdminEdit from "./pages/admin-edit";


//

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
        <Route path="map" element={<Authentication><MapPage /></Authentication>} />
        <Route path="balance" element={<Authentication><Balance /></Authentication>} />
        <Route path="receipt" element={<Authentication><Receipts /></Authentication>} />



        {/* ADMIN */}
        <Route element={<AdminRoute />} >
          <Route path="admin-kunder" element={<Authentication><AdminCustomers /></Authentication>} />
          <Route path="admin-parkering" element={<Authentication><AdminParkings /></Authentication>} />
          <Route path="admin-laddare" element={<Authentication><AdminChargers /></Authentication>} />
          <Route path="admin-cyklar" element={<Authentication><AdminBikes /></Authentication>} />
          <Route path="admin-edit/:id" element={<Authentication><AdminEdit /></Authentication>} />

          <Route path="map" element={<Authentication><MapPage /></Authentication>} /> {/* Kart-sidan */}

        </Route>
        
      </Route>
    </Routes>
  );
}
