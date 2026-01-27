import React from 'react'
import { StyleSheet, Text, Button, View } from "react-native";
import { useEffect, useState } from "react";
import { endRideBackend } from "./rideBackend";
import ThemedView from "../../components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
// Cornelias dator
const backendURL = "192.168.32.7"

// min dator
//const backendURL = "192.168.68.107"
const PRICE_PER_MINUTE = 2;

export default function Ride() {
  const [active, setActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [cost, setCost] = useState(0);
  const [lastReceipt, setLastReceipt] = useState(null);
  const { scooterId } = useLocalSearchParams();

  // ------------------------
  // Starta resa automatiskt om scooterId finns
  useEffect(() => {
    if (scooterId) {
      setActive(true);
    }
  }, [scooterId]);

const endRide = async () => {
  try {
    const receipt = await endRideBackend(scooterId);
    setActive(false);
    setLastReceipt(receipt);
  } catch (err) {
    alert(err.message);
  }
};

  return (
    <ThemedView style={styles.container}>
      {active && (
        <View style={styles.card}>
          <Text style={styles.title}>🛴 Pågående resa</Text>
          <Text>Resan pågår…</Text>
          <Button title="Avsluta resa" onPress={endRide} color="#d9534f" />
        </View>
      )}

      {!active && lastReceipt && (
        <View style={styles.card}>
          <Text style={styles.title}>🧾 Kvitto</Text>
          <Text>Tid: {lastReceipt.minutes} min</Text>
          <Text>Kostnad: {lastReceipt.cost} kr</Text>
          <Text>Batteri kvar: {lastReceipt.batteryLeft}%</Text>
          <Text>Avslutad: {lastReceipt.endedAt}</Text>

          <Button
            title="OK"
            onPress={() => router.replace("/receipts")}
            />
        </View>
      )}

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  value: {
    fontWeight: "bold",
  },
});
