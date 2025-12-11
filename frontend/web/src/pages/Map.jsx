// web/src/pages/Map.jsx
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapPage() {
  const [map, setMap] = useState(null);
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

  // Skapa kartan en gång
  useEffect(() => {
    if (map) return;

    const leafletMap = L.map("leaflet-map").setView([59.334, 18.063], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(leafletMap);

    setMap(leafletMap);
  }, []);

  // Hämta API-data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sRes, cRes, pRes] = await Promise.all([
          fetch("http://192.168.32.7:3000/api/scooters"),
          fetch("http://192.168.32.7:3000/api/charging"),
          fetch("http://192.168.32.7:3000/api/parking"),
        ]);

        setScooters(await sRes.json());
        setChargers(await cRes.json());
        setParkings(await pRes.json());
      } catch (err) {
        console.error("API fetch error:", err);
      }
    };

    fetchData();
  }, []);

  // När kartan + markers finns → rendera
  useEffect(() => {
    if (!map) return;

    // Scooters
    scooters.forEach(s => {
      L.marker([parseFloat(s.position_lat), parseFloat(s.position_long)], {
        icon: scooterIcon,
      }).addTo(map);
    });

    // Chargers
    chargers.forEach(c => {
      L.marker([parseFloat(c.position_lat), parseFloat(c.position_long)], {
        icon: chargerIcon,
      }).addTo(map);
    });

    // Parkings
    parkings.forEach(p => {
      L.marker([parseFloat(p.position_lat), parseFloat(p.position_long)], {
        icon: parkingIcon,
      }).addTo(map);
    });

  }, [map, scooters, chargers, parkings]);

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
