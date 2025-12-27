// web/src/pages/Map.jsx
import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// import { useNavigate } from "react-router-dom";

const backendURL = "localhost";


export default function MapPage() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //     const token = sessionStorage.getItem('token');
  //     if (!token) {
  //       navigate("/login");
  //     }
  // }, [navigate]);

  const mapRef = useRef(null);
  const [scooters, setScooters] = useState([]);
  const [chargers, setChargers] = useState([]);
  const [parkings, setParkings] = useState([]);

  // --- Ikoner ---
  const scooterIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/4357/4357585.png",
    iconSize: [35, 35],
  });

  const chargerIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/4430/4430952.png",
    iconSize: [35, 35],
  });

  const parkingIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/608/608690.png",
    iconSize: [35, 35],
  });

  // --- Skapa kartan en gång ---
  useEffect(() => {
    if (mapRef.current) return; // skapa bara en gång

    const leafletMap = L.map("leaflet-map").setView([59.334, 18.063], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(leafletMap);

    mapRef.current = leafletMap;
  }, []);

  // --- Hämta API-data ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sRes, cRes, pRes] = await Promise.all([
          fetch("http://localhost:3000/api/scooters"),
          fetch("http://localhost:3000/api/charging"),
          fetch("http://localhost:3000/api/parking"),
        ]);

        const scootersData = await sRes.json();
        const chargersData = await cRes.json();
        const parkingsData = await pRes.json();

        console.log("Scooters:", scootersData);
        console.log("Chargers:", chargersData);
        console.log("Parkings:", parkingsData);

        setScooters(scootersData);
        setChargers(chargersData);
        setParkings(parkingsData);
      } catch (err) {
        console.error("API fetch error:", err);
      }
    };

    fetchData();
  }, []);

  // --- Rendera markörer ---
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Ta bort gamla markörer (men inte tileLayer)
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) map.removeLayer(layer);
    });

    // Scooters
    scooters.forEach((s) => {
      if (s.position_lat && s.position_long) {
        L.marker([parseFloat(s.position_lat), parseFloat(s.position_long)], {
          icon: scooterIcon,
        }).addTo(map);
      } else {
        console.warn("Invalid scooter coords:", s);
      }
    });

    // Chargers
    chargers.forEach((c) => {
      if (c.position_lat && c.position_long) {
        L.marker([parseFloat(c.position_lat), parseFloat(c.position_long)], {
          icon: chargerIcon,
        }).addTo(map);
      } else {
        console.warn("Invalid charger coords:", c);
      }
    });

    // Parkings
    parkings.forEach((p) => {
      if (p.position_lat && p.position_long) {
        L.marker([parseFloat(p.position_lat), parseFloat(p.position_long)], {
          icon: parkingIcon,
        }).addTo(map);
      } else {
        console.warn("Invalid parking coords:", p);
      }
    });
  }, [scooters, chargers, parkings]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <h1 style={{ textAlign: "center" }}>Hoci Scooter Map (Web)</h1>
      <div
        id="leaflet-map"
        style={{ height: "90vh", width: "100%", borderRadius: "8px" }}
      ></div>
    </div>
  );
}
