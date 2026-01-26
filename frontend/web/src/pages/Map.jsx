import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const socketURL = import.meta.env.VITE_WS_URL;

// --- Ikoner utanför komponenten ---
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

export default function MapPage() {
  const markersRef = useRef(new Map());
  const mapRef = useRef(null);
  const wsRef = useRef(null);

  // prefix _ för att ESLint inte ska klaga
  const [_scooters, setScooters] = useState([]);
  const [_chargers, setChargers] = useState([]);
  const [_parkings, setParkings] = useState([]);

  useEffect(() => {
    if (mapRef.current) return;
    const map = L.map("leaflet-map").setView([59.334, 18.063], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const [cRes, pRes, sRes] = await Promise.all([
        fetch("http://localhost:3000/api/charging"),
        fetch("http://localhost:3000/api/parking"),
        fetch("http://localhost:3000/api/scooters"),
      ]);

      const chargers = await cRes.json();
      const parkings = await pRes.json();
      const scooters = await sRes.json();

      setChargers(chargers);
      setParkings(parkings);
      setScooters(scooters);

      const map = mapRef.current;
      if (!map) return;

      scooters.forEach((s) => {
        if (!s.position_lat || !s.position_long) return;
        const id = `scooter-${s.id}`;
        const lat = Number(s.position_lat);
        const long = Number(s.position_long);
        if (isNaN(lat) || isNaN(long)) return;

        const marker = L.marker([lat, long], { icon: scooterIcon })
          .addTo(map)
          .bindPopup(`<strong>Scooter ${s.id}</strong><br/>Batteri: ${s.battery}%<br/>`);

        markersRef.current.set(id, marker);
      });

      chargers.forEach((c) => {
        if (!c.position_lat || !c.position_long) return;
        const id = `charger-${c.id}`;
        if (markersRef.current.has(id)) return;

        const marker = L.marker([Number(c.position_lat), Number(c.position_long)], { icon: chargerIcon })
          .addTo(map)
          .bindPopup("Laddstation");

        markersRef.current.set(id, marker);
      });

      parkings.forEach((p) => {
        if (!p.position_lat || !p.position_long) return;
        const id = `parking-${p.id}`;
        if (markersRef.current.has(id)) return;

        const marker = L.marker([Number(p.position_lat), Number(p.position_long)], { icon: parkingIcon })
          .addTo(map)
          .bindPopup("Parkering");

        markersRef.current.set(id, marker);
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const ws = new WebSocket(socketURL);
    wsRef.current = ws;

    ws.onopen = () => console.log("WebSocket connected!");

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "scooter_update") {
        const map = mapRef.current;
        if (!map) return;

        msg.data.forEach((s) => {
          if (!s.position_lat || !s.position_long) return;
          const id = `scooter-${s.id}`;
          const lat = Number(s.position_lat);
          const long = Number(s.position_long);
          if (isNaN(lat) || isNaN(long)) return;

          if (markersRef.current.has(id)) {
            const marker = markersRef.current.get(id);
            marker.setLatLng([lat, long]);
            marker.setPopupContent(
              `<strong>Scooter ${s.id}</strong><br/>
               Batteri: ${s.battery}%<br/>
               Status: ${s.status}<br/>
               Tillgänglig: ${s.is_available ? "Ja" : "Nej"}`
            );
          } else {
            const marker = L.marker([lat, long], { icon: scooterIcon })
              .addTo(map)
              .bindPopup(
                `<strong>Scooter ${s.id}</strong><br/>
                 Batteri: ${s.battery}%<br/>
                 Status: ${s.status}<br/>
                 Tillgänglig: ${s.is_available ? "Ja" : "Nej"}`
              );
            markersRef.current.set(id, marker);
          }
        });

        setScooters(msg.data);
      }
    };

    ws.onclose = () => console.log("WebSocket disconnected!");
    return () => ws.close();
  }, []);

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
