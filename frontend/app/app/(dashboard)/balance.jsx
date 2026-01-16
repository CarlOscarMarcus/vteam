// app/(dashboard)/balance.jsx
import { StyleSheet, Text, TextInput, Button, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from "react-native";

import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import ThemedView from "../../components/ThemedView";
import { getToken } from "../../components/Token.jsx";

// Cornelias dator
// const backendURL = "192.168.32.7"

// min dator
const backendURL = "192.168.68.107"

export default function Balance() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");

  useFocusEffect(
    useCallback(() => {
        fetchBalance();
    }, [])
    );

  const fetchBalance = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`http://${backendURL}:3000/api/users/balance`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Kunde inte hämta saldo");
      const data = await res.json();
      setBalance(data.balance);
    } catch (err) {
      console.error(err);
      Alert.alert("Fel", err.message);
    }
  };

  const topUpBalance = async () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return Alert.alert("Fel", "Ange ett giltigt belopp att fylla på");
    }

    try {
      const token = await getToken();
      const res = await fetch(`http://${backendURL}:3000/api/users/balance/topup`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: parsedAmount }),
      });

      if (!res.ok) throw new Error("Påfyllning misslyckades");

      const data = await res.json();
      setBalance(data.balance);
      setAmount("");
      Alert.alert("Klart!", `Ditt nya saldo är ${data.balance} kr`);
    } catch (err) {
      console.error(err);
      Alert.alert("Fel", err.message);
    }
  };

  return (
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null} // flyttar upp innehållet på iOS
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={styles.container}>
            <Text style={styles.title}>💰 Ditt saldo</Text>
            <Text style={styles.balance}>{balance} kr</Text>

            <Text style={styles.label}>Fyll på saldo</Text>
            <TextInput
            style={styles.input}
            placeholder="Belopp i kr"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            />

            <Button title="Fyll på" onPress={topUpBalance} />
        </ThemedView>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  balance: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2e7d32",
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
});
