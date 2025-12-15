import { StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { getToken } from '../../components/Token.jsx';
import ThemedView from '../../components/ThemedView';
// import { leafletHtml } from '../assets/html/leaflet.js'

const leafletHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Leaflet Map</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    html, body, #map {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
    }
  </style>
</head>
<body>
<div id="map"></div>
<script>
  console.log("Leaflet HTML loaded");

  const map = L.map('map').setView([59.334591, 18.063240], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);

  // --- Ikoner ---
  const scooterIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/4357/4357585.png',
    iconSize: [40, 40],
  });

  const chargerIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/4430/4430952.png',
    iconSize: [40, 40],
  });

  const parkingIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/608/608690.png',
    iconSize: [40, 40],
  });

  function handleMessage(event) {
    let data;
    try { data = JSON.parse(event.data); } 
    catch(e){ console.warn("Invalid JSON:", event.data); return; }

    if(data.type === "position"){
      const {latitude, longitude} = data.coords;
      if(!window.userMarker){
        window.userMarker = L.marker([latitude, longitude]).addTo(map);
        map.setView([latitude, longitude], 15);
      } else {
        window.userMarker.setLatLng([latitude, longitude]);
      }
    }

    if(data.type === "scooters"){
      if(!window.scooterMarkers) window.scooterMarkers = [];
      window.scooterMarkers.forEach(m=>map.removeLayer(m));
      window.scooterMarkers=[];
      data.items.forEach(s=>{
        const m = L.marker([s.lat, s.lng], {icon: scooterIcon}).addTo(map);
        window.scooterMarkers.push(m);
      });
    }

    if(data.type === "chargers"){
      if(!window.chargerMarkers) window.chargerMarkers = [];
      window.chargerMarkers.forEach(m=>map.removeLayer(m));
      window.chargerMarkers=[];
      data.items.forEach(c=>{
        const m = L.marker([c.lat, c.lng], {icon: chargerIcon}).addTo(map);
        window.chargerMarkers.push(m);
      });
    }

    if(data.type === "parkings"){
      if(!window.parkingMarkers) window.parkingMarkers = [];
      window.parkingMarkers.forEach(m=>map.removeLayer(m));
      window.parkingMarkers=[];
      data.items.forEach(p=>{
        const m = L.marker([p.lat, p.lng], {icon: parkingIcon}).addTo(map);
        window.parkingMarkers.push(m);
      });
    }
  }

  document.addEventListener("message", handleMessage);
  window.addEventListener("message", handleMessage);
</script>
</body>
</html>`


export default function Map() {
  const webviewRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const backendURL = "192.168.68.103"
  const [scooters, setScooters] = useState([]);
  const [chargers, setChargers] = useState([]);
  const [parkings, setParkings] = useState([]);

  // --- Kontrollera inloggning ---
  useEffect(() => {
    async function checkToken() {
      const token = await getToken();
      if (!token) {
        router.replace("/login");
      }
    }
    checkToken();
  }, []);

  // --- Hämta data från API ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scooterRes, chargersRes, parkingRes] = await Promise.all([
          fetch('http://192.168.32.7:3000/api/scooters'),
          fetch('http://192.168.32.7:3000/api/charging'),
          fetch('http://192.168.32.7:3000/api/parking'),
        ]);

        const [scooterData, chargersData, parkingData] = await Promise.all([
          scooterRes.json(),
          chargersRes.json(),
          parkingRes.json(),
        ]);

        setScooters(
          scooterData.map(s => ({ id: s.id, lat: parseFloat(s.position_lat), lng: parseFloat(s.position_long) }))
        );

        setChargers(
          chargersData.map(c => ({ id: c.id, lat: parseFloat(c.position_lat), lng: parseFloat(c.position_long) }))
        );

        setParkings(
          parkingData.map(p => ({ id: p.id, lat: parseFloat(p.position_lat), lng: parseFloat(p.position_long) }))
        );

      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  // --- Skicka uppdaterad data till WebView ---
  useEffect(() => {
    if (!webviewRef.current) return;

    if (scooters.length > 0) webviewRef.current.postMessage(JSON.stringify({ type: 'scooters', items: scooters }));
    if (chargers.length > 0) webviewRef.current.postMessage(JSON.stringify({ type: "chargers", items: chargers }));
    if (parkings.length > 0) webviewRef.current.postMessage(JSON.stringify({ type: 'parkings', items: parkings }));
  }, [scooters, chargers, parkings]);

  // --- Starta GPS & skicka position till WebView ---
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 5 },
        (loc) => {
          if (webviewRef.current) {
            webviewRef.current.postMessage(JSON.stringify({ type: "position", coords: loc.coords }));
          }
        }
      );
    })();
  }, []);

  const onWebViewLoad = () => {
    if (!webviewRef.current) return;
    webviewRef.current.postMessage(JSON.stringify({ type: "scooters", items: scooters }));
    webviewRef.current.postMessage(JSON.stringify({ type: "chargers", items: chargers }));
    webviewRef.current.postMessage(JSON.stringify({ type: "parkings", items: parkings }));
  };

  const onMessage = (event) => {
    console.log("FROM WEBVIEW:", event.nativeEvent.data);
  };

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Hoci scooters</Text>
      <Text>Hyra elsparkcykel</Text>

      <Link style={styles.link} href="/">Hem</Link>

      <View style={styles.mapContainer}>
        <View style={{ flex: 1, width: '100%' }}>
          <WebView
            ref={webviewRef}
            // source={require('../assets/html/leaflet.html')}
            source={{ html: leafletHtml}}
            onLoad={onWebViewLoad}
            onMessage={onMessage}
            originWhitelist={['*']}
            allowFileAccess={true}
            allowUniversalAccessFromFileURLs={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 10 },
  title: { fontWeight: 'bold', fontSize: 20, margin: 10 },
  link: { fontWeight: 'bold', marginBottom: 10 },
  mapContainer: { flex: 1, alignItems: 'center' },
});
