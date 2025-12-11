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
  const [chargers, setChargers] = useState([
    { id: 1, lat: 59.335, lng: 18.065 },
    { id: 2, lat: 59.332, lng: 18.062 },
  ]);
  const [parkings, setParkings] = useState([
    { id: 1, lat: 59.333, lng: 18.061 },
    { id: 2, lat: 59.337, lng: 18.068 },
  ]);

  // --- Hämta scootrar från API ---
  useEffect(() => {
    const fetchScooters = async () => {
      try {
        const res = await fetch('http://192.168.32.7:3000/api/scooters');
        const data = await res.json();

        // Konvertera positioner till float
        const formatted = data.map(s => ({
          id: s.id,
          lat: parseFloat(s.position_lat),
          lng: parseFloat(s.position_long),
        }));
        setScooters(formatted);
      } catch (err) {
        console.error('Error fetching scooters:', err);
      }
    };

    fetchScooters();
  }, []);

  // --- Skicka scootrar till WebView när de ändras ---
  useEffect(() => {
    if (webviewRef.current && scooters.length > 0) {
      webviewRef.current.postMessage(JSON.stringify({ type: 'scooters', items: scooters }));
    }
  }, [scooters]);

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

  // --- Skicka när WebView laddas ---
  const onWebViewLoad = () => {
    if (!webviewRef.current) return;
    webviewRef.current.postMessage(JSON.stringify({ type: "scooters", items: scooters }));
    webviewRef.current.postMessage(JSON.stringify({ type: "chargers", items: chargers }));
    webviewRef.current.postMessage(JSON.stringify({ type: "parkings", items: parkings }));
  };

  // --- Eventuella meddelanden från WebView ---
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
