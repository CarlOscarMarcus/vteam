// app/(dashboard)/balance.jsx
import React from 'react'
import { StyleSheet, Text, TextInput, Button, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from "react-native";
import {
  fetchBalanceBackend,
  topUpBalanceBackend,
} from "./balanceBackend";

import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import ThemedView from "../../components/ThemedView";
import { getToken } from "../../components/Token.jsx";

// Cornelias dator
const backendURL = "192.168.32.7"

// min dator
//const backendURL = "192.168.68.107"

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
      const newBalance = await fetchBalanceBackend();
      setBalance(newBalance);
    } catch (err) {
      console.error(err);
      Alert.alert("Fel", err.message);
    }
  };

  const topUpBalance = async () => {
    try {
      const newBalance = await topUpBalanceBackend(amount);
      setBalance(newBalance);
      setAmount("");
      Alert.alert("Klart!", `Ditt nya saldo är ${newBalance} kr`);
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