import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';

import ThemedView from '../components/ThemedView';

export default function Map() {
  const webviewRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Exempeldata – scootrar
  const scooters = [
    { id: 1, lat: 59.334, lng: 18.063 },
    { id: 2, lat: 59.336, lng: 18.070 },
  ];

  // Starta GPS & skicka position till WebView
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
              JSON.stringify({
                type: "position",
                coords: loc.coords,
              })
            );
          }
        }
      );
    })();
  }, []);

  // Skickas när HTML-filen är klar → lägg ut scooter-markers
  const onWebViewLoad = () => {
    if (webviewRef.current) {
      webviewRef.current.postMessage(
        JSON.stringify({
          type: "scooters",
          items: scooters,
        })
      );
    }
  };

  // Eventuella meddelanden från WebView → debug
  const onMessage = (event) => {
    console.log("FROM WEBVIEW:", event.nativeEvent.data);
  };

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Hoci scooters</Text>
      <Text>Hyra elsparkcykel</Text>

      <Link style={styles.link} href="/">Hem</Link>

      <View style={styles.mapContainer}>
        <View style={{flex:1, width:'100%'}}>
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
            style={{flex:1}}
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
  webview: {
    width: '90%',
    height: '70%',
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 10,
  },
});
