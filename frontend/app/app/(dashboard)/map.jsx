import { StyleSheet, Text, View } from "react-native";
import { Link, router } from "expo-router";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { getToken } from "../../components/Token.jsx";
import ThemedView from "../../components/ThemedView";

/* ---------------- LEAFLET HTML ---------------- */
const leafletHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Leaflet Map</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    html, body, #map { margin:0; padding:0; height:100%; width:100%; }
  </style>
</head>
<body>
  <div id="map"></div>

  <script>
    const map = L.map('map').setView([59.334591, 18.063240], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map);

    // 🔔 SIGNALERA TILL REACT NATIVE ATT KARTAN ÄR KLAR
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ type: "map-ready" })
    );

    const scooterIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/4357/4357585.png',
      iconSize: [40, 40]
    });

    const chargerIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/4430/4430952.png',
      iconSize: [40, 40]
    });

    const parkingIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/608/608690.png',
      iconSize: [40, 40]
    });

    function handleMessage(event) {
      let data;
      try { data = JSON.parse(event.data); } catch { return; }

      if (data.type === "position") {
        const { latitude, longitude } = data.coords;
        if (!window.userMarker) {
          window.userMarker = L.marker([latitude, longitude]).addTo(map);
          map.setView([latitude, longitude], 15);
        } else {
          window.userMarker.setLatLng([latitude, longitude]);
        }
      }

      function updateMarkers(key, icon) {
        if (!window[key]) window[key] = [];
        window[key].forEach(m => map.removeLayer(m));
        window[key] = [];

        data.items.forEach(item => {
          const m = L.marker([item.lat, item.lng], { icon }).addTo(map);
          window[key].push(m);
        });
      }

      if (data.type === "scooters") updateMarkers("scooterMarkers", scooterIcon);
      if (data.type === "chargers") updateMarkers("chargerMarkers", chargerIcon);
      if (data.type === "parkings") updateMarkers("parkingMarkers", parkingIcon);
    }

    document.addEventListener("message", handleMessage);
    window.addEventListener("message", handleMessage);
  </script>
</body>
</html>
`;

/* ---------------- REACT NATIVE ---------------- */
export default function Map() {
  const webviewRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  const [scooters, setScooters] = useState([]);
  const [chargers, setChargers] = useState([]);
  const [parkings, setParkings] = useState([]);

  /* ---------- AUTH ---------- */
  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (!token) router.replace("/login");
    })();
  }, []);

  /* ---------- API ---------- */
  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const backendURL = "192.168.32.7";

        const [s, c, p] = await Promise.all([
          fetch(`http://${backendURL}:3000/api/scooters`, { headers }),
          fetch(`http://${backendURL}:3000/api/charging`, { headers }),
          fetch(`http://${backendURL}:3000/api/parking`, { headers }),
        ]);

        const [sd, cd, pd] = await Promise.all([
          s.json(), c.json(), p.json()
        ]);

        setScooters(sd.map(x => ({ id: x.id, lat: +x.position_lat, lng: +x.position_long })));
        setChargers(cd.map(x => ({ id: x.id, lat: +x.position_lat, lng: +x.position_long })));
        setParkings(pd.map(x => ({ id: x.id, lat: +x.position_lat, lng: +x.position_long })));
      } catch (e) {
        console.error("API error:", e);
      }
    })();
  }, []);

  /* ---------- SEND MARKERS ---------- */
  useEffect(() => {
    if (!mapReady || !webviewRef.current) return;

    webviewRef.current.postMessage(JSON.stringify({ type: "scooters", items: scooters }));
    webviewRef.current.postMessage(JSON.stringify({ type: "chargers", items: chargers }));
    webviewRef.current.postMessage(JSON.stringify({ type: "parkings", items: parkings }));
  }, [mapReady, scooters, chargers, parkings]);

  /* ---------- GPS ---------- */
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 5 },
        loc => {
          webviewRef.current?.postMessage(
            JSON.stringify({ type: "position", coords: loc.coords })
          );
        }
      );
    })();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>🛴 Hoci scooters</Text>
      <Link style={styles.link} href="/">Hem</Link>

      <View style={styles.mapContainer}>
        <WebView
          ref={webviewRef}
          source={{ html: leafletHTML }}
          originWhitelist={["*"]}
          javaScriptEnabled
          domStorageEnabled
          onMessage={(event) => {
            const msg = JSON.parse(event.nativeEvent.data);
            if (msg.type === "map-ready") {
              console.log("🗺️ Map ready");
              setMapReady(true);
            }
          }}
          style={{ flex: 1 }}
        />
      </View>
    </ThemedView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 20, fontWeight: "bold", margin: 10 },
  link: { fontWeight: "bold", marginBottom: 10 },
  mapContainer: { flex: 1 },
});
