import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';

import ThemedView from '../components/ThemedView';

export default function Map() {
  const webviewRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [scooters, setScooters] = useState([]);
  const [chargers, setChargers] = useState([]);
  const [parkings, setParkings] = useState([]);

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

        // Konvertera positioner till float
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

  // --- Skicka uppdaterad data till WebView när den ändras ---
  useEffect(() => {
    if (!webviewRef.current) return;

    if (scooters.length > 0) {
      console.log("Sending scooters:", scooters);
      webviewRef.current.postMessage(JSON.stringify({ type: 'scooters', items: scooters }));
    }
    if (chargers.length > 0) {
      console.log("Sending chargers:", chargers);
      webviewRef.current.postMessage(JSON.stringify({ type: "chargers", items: chargers }));
    }
    if (parkings.length > 0) {
      console.log("Sending parkings:", parkings);
      webviewRef.current.postMessage(JSON.stringify({ type: 'parkings', items: parkings }));
    }
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
            webviewRef.current.postMessage(
              JSON.stringify({ type: "position", coords: loc.coords })
            );
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
            source={require('../assets/html/leaflet.html')}
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
  container: {
    flex: 1,
    paddingTop: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 10,
  },
  link: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mapContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
