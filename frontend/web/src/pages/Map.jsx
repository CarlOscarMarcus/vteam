// web/src/pages/Map.jsx
import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapPage() {
  const markersRef = useRef(new Map()) 
  const mapRef = useRef(null);
  const wsRef = useRef(null);
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

  // --- WebSocket ---
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080")
    wsRef.current = ws

    ws.onopen = () => {
      console.log("websocket connected!")
    }

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data)
      if (msg.type === "scooter_update") {
        setScooters(msg.data)
        console.log(msg.data)
      }
    }

    ws.onclose = () => {
      console.log("Websocket disconnected!")
    }

    return () => ws.close()
  }, [])
  // --- Hämta API-data ---
  useEffect(() => {
    const fetchData = async () => {
        const [sRes, cRes, pRes] = await Promise.all([

          fetch("http://localhost:3000/api/scooters"),
          fetch("http://localhost:3000/api/charging"),
          fetch("http://localhost:3000/api/parking"),
        ]);


        setScooters(await sRes.json());
        setChargers(await cRes.json());
        setParkings(await pRes.json());

    };

    fetchData();
  }, []);

  // --- Rendera markörer ---
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;


    // // Ta bort gamla markörer (men inte tileLayer)
    // map.eachLayer((layer) => {
    //   if (layer instanceof L.Marker) map.removeLayer(layer);
    // });

    scooters.forEach((s) => {
      if (!s.position_lat || !s.position_long) return

      const id = `scooter-${s.id}`
      const lat = parseFloat(s.position_lat)
      const long = parseFloat(s.position_long)

      if (isNaN(lat) || isNaN(long)) return;

          console.log(
      "Scooter",
      s.id,
      "LAT:", lat,
      "LONG:", long
    );

      if (markersRef.current.has(id)) {
        markersRef.current.get(id).setLatLng([lat, long])
      } else {
        const marker = L.marker([lat, long], {
          icon: scooterIcon,
        })
          .addTo(map)
          .bindPopup(
            `<strong>Scooter ${s.id}</strong><br />
            Batteri: ${s.battery}% <br/>
            Status: ${s.status}`
          )
          markersRef.current.set(id, marker)
      }
    })

    chargers.forEach((c) => {
      if (!c.position_lat || !c.position_long) return

      const id = `charger-${c.id}`
      if (markersRef.current.has(id)) return

      const marker = L.marker(
        [parseFloat(c.position_lat), parseFloat(c.position_long)],
        { icon: chargerIcon }
      )
        .addTo(map)
        .bindPopup("Laddstation")

      markersRef.current.set(id, marker)
    })

      parkings.forEach((p) => {
      if (!p.position_lat || !p.position_long) return

      const id = `parking-${p.id}`
      if (markersRef.current.has(id)) return

      const marker = L.marker(
        [parseFloat(p.position_lat), parseFloat(p.position_long)],
        { icon: parkingIcon }
      )
        .addTo(map)
        .bindPopup("Parkering")

      markersRef.current.set(id, marker)
    })
  }, [scooters, chargers, parkings])

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
